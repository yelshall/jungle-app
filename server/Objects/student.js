const schemas = require('../schemas/schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const event_functions = require('./event');
const host_functions = require('./host');

var createStudent = (newStudent, callback) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(newStudent.password, salt);

    let student = new schemas.Student({
        email: newStudent.email.toLowerCase(),
        password: hash,
        fullName: {
            firstName: newStudent.fullName.firstName,
            lastName: newStudent.fullName.lastName
        },
        birthDate: newStudent.birthDate,
        gender: newStudent.gender,
        tags: newStudent.tags,
        imageURL: newStudent.imageURL,
        expoPushToken: newStudent.expoPushToken
    });

    student.save()
        .then(res => {
            let token = jwt.sign({ id: res._id, email: res.email, signInType: 'STUDENT' }, process.env.APP_SECRET, {
                expiresIn: 2592000 // 1 month
            });

            res.password = undefined;
            res.token = { id: res._id, email: res.email, token: token, signInType: 'STUDENT' };
            if (callback) { callback(null, res); }
        })
        .catch(err => {
            if (callback) { callback(err, null); }
        });
};

var isStudentLogin = async (loginInfo) => {
    try {
        let doc = await schemas.Student.findOne({ email: loginInfo.email });
        if (doc === null) {
            return false;
        }
        return true;
    } catch (error) {
        return null;
    }
};

var loginStudent = (loginInfo, callback) => {
    schemas.Student.findOne({ email: loginInfo.email }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
            return;
        }

        if (res === null) {
            if (callback) { callback({ err: 'INCORRECT_EMAIL' }, null); }
            return;
        }

        if (!bcrypt.compareSync(loginInfo.password, res.password)) {
            if (callback) { callback({ err: 'INCORRECT_PASSWORD' }, null); }
        } else {
            let token = jwt.sign({ id: res._id, email: res.email, signInType: 'STUDENT' }, process.env.APP_SECRET, {
                expiresIn: 2592000 // 1 month
            });
            if (callback) { callback(null, { id: res._id, email: res.email, token: token, signInType: 'STUDENT' }); }
        }
    });
};

var getStudent = (sid, callback) => {
    schemas.Student.findById(sid)
        .populate('interestedEvents')
        .populate('confirmedEvents')
        .populate('recommendedEvents')
        .populate('following')
        .populate('tags')
        .populate('notifications')
        .populate('messages')
        .exec(async (err, res) => {
            if (err) {
                if (callback) { callback(err, null); }
            } else {
                if (res == undefined) {
                    if (callback) { callback({ err: 'No student found.' }, null); }
                    return;
                }
                let messages = [];
                for (let i = 0; i < res.messages.length; i++) {
                    messages.push(
                        await schemas.Messages.findById(res.messages[i]._id)
                            .populate({ path: 'firstId', model: schemas.Student })
                            .populate({ path: 'secondId', model: schemas.Host })
                            .exec()
                    );
                }
                res.password = undefined;
                res.messages = messages;
                if (callback) { callback(null, res); }
            }
        });
};

var updateStudent = (sid, update, callback) => {
    if (update.type === "CHANGE_FIELD") {
        switch (update.field) {
            case "NAME":
                updateStudentName(sid, update.name, callback);
                break;
            case "EMAIL":
                updateStudentEmail(sid, update.email, callback);
                break;
            case "BIRTHDATE":
                updateStudentBirthDate(sid, update.birthDate, callback);
                break;
            case "GENDER":
                updateStudentGender(sid, update.gender, callback);
                break;
            case "IMAGE":
                updateStudentImage(sid, update.image, callback);
                break;
            case "EXPO_TOKEN":
                updateStudentExpoToken(sid, update.expoPushToken, callback);
                break;
            default:
                if (callback) { callback({ err: "Incorrect update field" }, null); }
                break;
        }
    } else if (update.type === "ADD") {
        switch (update.field) {
            case "INTERESTED_EVENT":
                addInterestedEvent(sid, update.eid, callback);
                break;
            case "CONFIRMED_EVENT":
                addConfirmedEvent(sid, update.eid, callback);
                break;
            case "RECOMMENDED_EVENT":
                addRecommendedEvent(sid, update.eid, callback);
                break;
            case "UNLIKED_EVENT":
                addUnlikedEvent(sid, update.eid, callback);
                break;
            case "TAG":
                addTag(sid, update.tid, callback);
                break;
            case "NOTIFICATION":
                addNotification(sid, update.nid, callback);
                break;
            case "MESSAGES":
                addMessages(sid, update.mid, callback);
                break;
            case "HOST":
                addHost(sid, update.hid, callback);
                break;
            default:
                if (callback) { callback({ err: "Incorrect update field" }, null); }
                break;
        }
    } else if (update.type === "REMOVE") {
        switch (update.field) {
            case "INTERESTED_EVENT":
                removeInterestedEvent(sid, update.eid, callback);
                break;
            case "CONFIRMED_EVENT":
                removeConfirmedStudent(sid, update.eid, callback);
                break;
            case "RECOMMENDED_EVENT":
                removeRecommendedEvent(sid, update.eid, callback);
                break;
            case "UNLIKED_EVENT":
                removeUnlikedEvent(sid, update.eid, callback);
                break;
            case "TAG":
                removeTag(sid, update.tid, callback);
                break;
            case "NOTIFICATION":
                removeNotification(sid, update.nid, callback);
                break;
            case "MESSAGES":
                removeMessages(sid, update.mid, callback);
                break;
            case "HOST":
                removeHost(sid, update.hid, callback);
                break;
            default:
                if (callback) { callback({ err: "Incorrect update field" }, null); }
                break;
        }
    } else {
        if (callback) { callback({ err: "Incorrect update field" }, null); }
    }
};

var deleteStudent = (sid, callback) => {
    getStudent(sid, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            //Remove interested events
            //Remove confirmed events
            //Remove unliked events
            //Remove recommended events
            //Remove hosts
            //Remove notifications
            //Remove messages
            res.interestedEvents.forEach((interestedEvent, index) => {
                event_functions.removeInterestedStudent(interestedEvent, sid);
            });

            res.confirmedEvents.forEach((confirmedEvent, index) => {
                event_functions.removeConfirmedStudent(confirmedEvent, sid);
            });

            res.unlikedEvents.forEach((confirmedEvent, index) => {
                event_functions.removeUnlikedStudent(confirmedEvent, sid);
            });

            res.following.forEach((host, index) => {
                host_functions.removeFollower(host, sid);
            });

            //Messages and notifications

            schemas.Student.findByIdAndDelete(sid, (err, res2) => {
                if (err) {
                    if (callback) { callback(err, null); }
                } else {
                    if (res2.password) { res2.password = undefined; }
                    if (callback) { callback(null, res2); }
                }
            });
        }
    });
};

var addInterestedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { interestedEvents: eid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null) }
            return;
        }
        event_functions.addInterestedStudent(eid, sid, callback);
    });
};

var addConfirmedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { confirmedEvents: eid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null) }
            return;
        }
        event_functions.addConfirmedStudent(eid, sid, callback);
    });
};

var addUnlikedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { unlikedEvents: eid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null) }
            return;
        }
        event_functions.addUnlikedStudent(eid, sid, callback);
    });
};

var addRecommendedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { recommendedEvents: eid } }, callback);
};

var addMessages = (sid, mid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { messages: mid } }, callback);
};

var addTag = (sid, tid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { tags: tid } }, callback);
};

var addNotification = (sid, nid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { notifications: nid } }, callback);
};

var addHost = (sid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $addToSet: { following: hid } }, (err, res) => {
        if(err) {
            if(callback) {callback(err, null)}
            return;
        }
        host_functions.addFollower(hid, sid, callback);
    });
};

var removeInterestedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { interestedEvents: eid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null) }
            return;
        }
        event_functions.removeInterestedStudent(eid, sid, callback);
    });
};

var removeConfirmedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { confirmedEvents: eid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null) }
            return;
        }
        event_functions.removeConfirmedStudent(eid, sid, callback);
    });
};

var removeUnlikedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { unlikedEvents: eid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null) }
            return;
        }
        event_functions.removeUnlikedStudent(eid, sid, callback);
    });
};

var removeRecommendedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { recommendedEvents: eid } }, callback);
};

var removeMessages = (sid, mid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { messages: mid } }, callback);
};

var removeTag = (sid, tid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { tags: tid } }, callback);
};

var removeNotification = (sid, nid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { notifications: nid } }, callback);
};

var removeHost = (sid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { $pull: { following: hid } }, (err, res) => {
        if(err) {
            if(callback) {callback(err, null)}
            return;
        }
        host_functions.removeFollower(hid, sid, callback);
    });
};

var updateStudentName = (sid, name, callback) => {
    schemas.Student.findByIdAndUpdate(sid,
        { $set: { 'fullName.firstName': name.firstName, 'fullName.lastName': name.lastName } },
        callback);
};

var updateStudentEmail = (sid, email, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { email: email }, callback);
};

var updateStudentBirthDate = (sid, birthDate, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { birthDate: birthDate }, callback);
};

var updateStudentGender = (sid, gender, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { gender: gender }, callback);
};

var updateStudentImage = (sid, image, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { imageURL: image }, callback);
};

var updateStudentExpoToken = (sid, expoPushToken, callback) => {
    schemas.Student.findByIdAndUpdate(sid, { expoPushToken: expoPushToken }, callback);
};

var getRecommendations = (sid, callback) => {
    //Call recommendation algorithm to get recommendations for events
};

module.exports = {
    createStudent: createStudent,
    isStudentLogin: isStudentLogin,
    loginStudent: loginStudent,
    getStudent: getStudent,
    deleteStudent: deleteStudent,
    addConfirmedEvent: addConfirmedEvent,
    addInterestedEvent: addInterestedEvent,
    addUnlikedEvent: addUnlikedEvent,
    removeConfirmedEvent: removeConfirmedEvent,
    removeInterestedEvent: removeInterestedEvent,
    removeUnlikedEvent: removeUnlikedEvent,
    addHost: addHost,
    removeHost: removeHost,
    removeRecommendedEvent: removeRecommendedEvent,
    removeTag: removeTag,
    removeMessages: removeMessages,
    removeNotification: removeNotification,
    addRecommendedEvent: addRecommendedEvent,
    addMessages: addMessages,
    addNotification: addNotification,
    addTag: addTag,
    getRecommendations: getRecommendations,
    updateStudentBirthDate: updateStudentBirthDate,
    updateStudentEmail: updateStudentEmail,
    updateStudentExpoToken: updateStudentExpoToken,
    updateStudentGender: updateStudentGender,
    updateStudentImage: updateStudentImage,
    updateStudentName: updateStudentName,
    updateStudent: updateStudent
};
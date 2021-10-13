const schemas = require('../schemas/schemas');
const host_functions = require('./host');
const event_functions = require('./event');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var studentSignup = (newStudent, callback) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(newStudent.password, salt);

    let student = new schemas.Student({
        email: newStudent.email,
        password: hash,
        fullName: {
            firstName: newStudent.fullName.firstName,
            lastName: newStudent.fullName.lastName
        },
        birthDate: newStudent.birthDate,
        gender: newStudent.gender,
        tags: newStudent.tags
    });

    student.save()
    .then(res => {
        res.password = undefined;
        if (callback) {callback(null, res);}
    })
    .catch(err => {
        if (callback) {callback(err, null);}
    });
};

var isStudentLogin = async (loginInfo, callback) => {
    try {
        let doc = await schemas.Student.findOne({email: loginInfo.email});
        if(doc === null) {
            return false;
        }
        return true;
    } catch (error) {
        return null;
    }
};

var studentLogin = (loginInfo, callback) => {
    schemas.Student.findOne({email: loginInfo.email}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
            return;
        }
        
        if(res === null) {
            if(callback) {callback({err: 'INCORRECT_EMAIL'}, null);}
            return;
        }

        if(!bcrypt.compareSync(loginInfo.password, res.password)) {
            if(callback) {callback({err: 'INCORRECT_PASSWORD'}, null);}
        } else {
            let token = jwt.sign({ email: res.email, signInType: 'STUDENT' }, process.env.APP_SECRET, {
                expiresIn: 2592000 // 1 month
            });            
            if(callback) {callback(null, {email: res.email, token: token, signInType: 'STUDENT'});}
        }
    });
};

var retreiveStudentInfo = (sid, callback) => {
    schemas.Student.findById(sid, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            res.password = undefined;
            if(callback) {callback(null, res);}
        }
    });
};

var deleteStudent = (sid, callback) => {
    retreiveStudentInfo(sid, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            res.interestedEvents.forEach((interestedEvent, index) => {
                event_functions.removeInterestedStudent(interestedEvent, sid);
            });

            res.confirmedEvents.forEach((confirmedEvent, index) => {
                event_functions.removeConfirmedStudent(confirmedEvent, sid);
            });

            res.following.forEach((host, index) => {
                host_functions.removeFollower(host, sid);
            });
            
            schemas.Student.findByIdAndDelete(sid, (err, res2) => {
                if (err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(res2.password) {res2.password = undefined;}
                    if(callback) {callback(null, res2);}
                }
            });
        }
    });
};

var addInterestedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$push: {interestedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            event_functions.addInterestedStudent(eid, sid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(res.password) {res.password = undefined;}
                    if(callback) {callback(null, res);}
                }
            });
        }
    });
};

var addConfirmedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$push: {confirmedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            event_functions.addConfirmedStudent(eid, sid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(res.password) {res.password = undefined;}
                    if(callback) {callback(null, res);}
                }
            });        
        }
    });
};

var removeInterestedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$pull: {interestedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            event_functions.removeInterestedStudent(eid, sid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(res.password) {res.password = undefined;}
                    if(callback) {callback(null, res);}
                }
            });        
        }
    });
};

var removeConfirmedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$pull: {confirmedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            event_functions.removeConfirmedStudent(eid, sid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(res.password) {res.password = undefined;}
                    if(callback) {callback(null, res);}
                }
            });        
        }
    });
};

var followHost = (sid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$push: {following: hid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            host_functions.addFollower(hid, sid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(res.password) {res.password = undefined;}
                    if(callback) {callback(null, res);}
                }
            });
        }
    });
};

var unfollowHost = (sid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$pull: {following: hid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            host_functions.removeFollower(hid, sid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(res.password) {res.password = undefined;}
                    if(callback) {callback(null, res);}
                }
            });
        }
    });
};

var getRecommendations = (sid, callback) => {
    //Call recommendation algorithm to get recommendations for events
};

module.exports = {
    studentSignup: studentSignup,
    isStudentLogin: isStudentLogin,
    studentLogin: studentLogin,
    retreiveStudentInfo: retreiveStudentInfo,
    deleteStudent: deleteStudent,
    addConfirmedEvent: addConfirmedEvent,
    addInterestedEvent: addInterestedEvent,
    removeConfirmedEvent: removeConfirmedEvent,
    removeInterestedEvent: removeInterestedEvent,
    followHost: followHost,
    unfollowHost: unfollowHost,
    getRecommendations: getRecommendations
};
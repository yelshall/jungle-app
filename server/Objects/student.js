const schemas = require('../schemas/schemas');
const host_functions = require('./host');
const event_functions = require('./event');

var studentSignup = (newStudent, callback) => {
    //Hash the password
    let student = new schemas.Student({
        username: newStudent.username,
        email: newStudent.email,
        password: newStudent.password,
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

var studentLogin = (loginInfo, callback) => {
    //Implement later
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
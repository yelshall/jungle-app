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
        birthdate: newStudent.birthdate,
        gender: newStudent.gender,
        tags: newStudent.tags
    });

    student.save()
    .then(data => {
        if (callback) callback(null, data);
    })
    .catch(err => {
        if (callback) callback(err, null);
    });
};

var studentLogin = (loginInfo, callback) => {
    //Implement later
};

var retreiveStudentInfo = (sid, callback) => {
    //Maybe remove password
    schemas.Student.findById(sid, (err, res) => {
        if (err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var addInterestedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$push: {interestedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            event_functions.addInterestedStudent(eid, sid, callback);
        }
    });
};

var addConfirmedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$push: {confirmedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            event_functions.addConfirmedStudent(eid, sid, callback);
        }
    });
};

var removeInterestedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$pull: {interestedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            event_functions.removeInterestedStudent(eid, sid, callback);
        }
    });
};

var removeConfirmedEvent = (sid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$pull: {confirmedEvents: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            event_functions.removeConfirmedStudent(eid, sid, callback);
        }
    });
};

var followHost = (sid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$push: {following: hid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            host_functions.addFollower(hid, callback);
            if(callback) callback(null, res);
        }
    });
};

var unfollowHost = (sid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(sid, {$pull: {following: hid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            host_functions.removeFollower(hid, callback);
            if(callback) callback(null, res);
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
    addConfirmedEvent: addConfirmedEvent,
    addInterestedEvent: addInterestedEvent,
    removeConfirmedEvent: removeConfirmedEvent,
    removeInterestedEvent: removeInterestedEvent,
    followHost: followHost,
    unfollowHost: unfollowHost,
    getRecommendations: getRecommendations
};
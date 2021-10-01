const schemas = require('../schemas/schemas');
const host_functions = require('./host');

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
        console.log('(SUCCESS) In studentSignup: Student saved successfully');
        if (callback) callback(null, data);
    })
    .catch(err => {
        console.log('(ERROR) In studentSignup: Failed to save student');
        if (callback) callback(err, null);
    });
};

var studentLogin = (loginInfo, callback) => {
    //Implement later
};

var retreiveStudentInfo = (sid, callback) => {
    schemas.Student.findById(sid, (err, res) => {
        if (err) {
            console.log('(ERROR) In retreiveStudentInfo: Could not find the student');
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var addInterestedEvent = (uid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(uid, {$push: {interestedEvents: eid}}, (err, res) => {
        if(err) {
            console.log('(ERROR) In addIneterestedEvent: Could not add event');
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var addConfirmedEvent = (uid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(uid, {$push: {confirmedEvents: eid}}, (err, res) => {
        if(err) {
            console.log('(ERROR) In addConfirmedEvent: Could not add event');
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeInterestedEvent = (uid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(uid, {$pull: {interestedEvents: eid}}, (err, res) => {
        if(err) {
            console.log('(ERROR) In removeInterestedEvent: Could not remove event');
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeConfirmedEvent = (uid, eid, callback) => {
    schemas.Student.findByIdAndUpdate(uid, {$pull: {confirmedEvents: eid}}, (err, res) => {
        if(err) {
            console.log('(ERROR) In removeConfirmedEvent: Could not remove event');
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var followHost = (uid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(uid, {$push: {following: hid}}, (err, res) => {
        if(err) {
            console.log('(ERROR) In followHost: Could not follow host');
            if(callback) callback(err, null);
        } else {
            host_functions.addFollower(hid);
            if(callback) callback(null, res);
        }
    });
};

var unfollowHost = (uid, hid, callback) => {
    schemas.Student.findByIdAndUpdate(uid, {$pull: {following: hid}}, (err, res) => {
        if(err) {
            console.log('(ERROR) In unfollowHost: Could not follow host');
            if(callback) callback(err, null);
        } else {
            host_functions.removeFollower(hid);
            if(callback) callback(null, res);
        }
    });
};

var getRecommendations = (uid, callback) => {
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
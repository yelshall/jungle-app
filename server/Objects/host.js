const schemas = require("../schemas/schemas");
const event_functions = require("../Objects/event");

var hostSignup = (newHost, callback) => {
    //Hash password first
    let host = {
        email: newHost.email,
        password: newHost.password,
        hostName: newHost.hostName,
        description: newHost.description,
        tags: newHost.tags
    };

    if(newHost.phoneNumber) host.phoneNumber = newHost.phoneNumber;
    if(newHost.website) host.website = newHost.website;

    let hostSave = new schemas.Host(host);
    
    hostSave.save()
    .then(data => {
        console.log('(SUCCESS) In hostSignup: Host saved successfully');
        if (callback) callback(null, data);
    })
    .catch(err => {
        console.log('(ERROR) In hostSignup: Failed to save host');
        if (callback) callback(err, null);
    });
};

var hostLogin = (loginInfo, callback) => {
    //Implement Later
};

var createEventHost = (newEvent, callback) => {
    event_functions.createEvent(newEvent, callback);
};

var updateEvent = (hid, eid) => {
    //Implement Later
    //Possibly have a switch statement and call the
    //relevant function from event script
};

var deleteEventHost = (hid, eid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$pull: {events: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            event_functions.deleteEvent(eid, callback);
        }
    });
};

var addFollower = (hid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$inc: {followerCount: 1}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeFollower = (hid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$inc: {followerCount: -1}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

module.exports = {
    hostSignup: hostSignup,
    hostLogin: hostLogin,
    createEventHost: createEventHost,
    updateEvent: updateEvent,
    deleteEventHost: deleteEventHost,
    addFollower: addFollower,
    removeFollower: removeFollower
};
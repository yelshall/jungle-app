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

var createEventHost = (newEvent) => {
    event_functions.createEvent(newEvent);
};

var updateEvent = (hid, eid) => {
    //Implement Later
    //Possibly have a switch statement and call the
    //relevant function from event script
};

var deleteEvent = (hid, eid) => {
    schemas.Host.findByIdAndUpdate(hid, {$pull: {events: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            event_functions.deleteEvent(eid);
        }
    });
};

var addFollower = (hid) => {
    schemas.Host.findByIdAndUpdate(hid, {$inc: {followerCount: 1}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeFollower = (hid) => {
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
    deleteEvent: deleteEvent,
    addFollower: addFollower,
    removeFollower: removeFollower
};
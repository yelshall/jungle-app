const schemas = require("../schemas/schemas");
const event_functions = require("./event");
const tag_functions = require("./tag");

var hostSignup = (newHost, callback) => {
    //Hash password first
    let host = {
        email: newHost.email,
        password: newHost.password,
        hostName: newHost.hostName,
        description: newHost.description,
        tags: newHost.tags
    };

    if(newHost.phoneNumber) {host.phoneNumber = newHost.phoneNumber;}
    if(newHost.website) {host.website = newHost.website;}

    let hostSave = new schemas.Host(host);

    hostSave.save()
    .then(data => {
        if(newHost.tags) {
            newHost.tags.forEach((tag, index) => {
                tag_functions.addHost(tag, data._id);
            });
        }
        data.password = undefined;
        if (callback) {callback(null, data);}
    })
    .catch(err => {
        if (callback) {callback(err, null);}
    });
};

var hostLogin = (loginInfo, callback) => {
    //Implement Later
};

var deleteHost = (hid, callback) => {
    schemas.Host.findById(hid, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            res.followers.forEach((follower, index) => {
                schemas.Student.findByIdAndUpdate(follower, {$pull: {following: hid}}, (err, res) => {
                    return;
                });
            });

            res.events.forEach((event, index) => {
                event_functions.deleteEvent(event);
            });

            res.tags.forEach((tag, index) => {
                tag_functions.removeHost(tag, hid);
            });

            schemas.Host.findByIdAndDelete(hid, (err, res2) => {
                if(err) { 
                    if(callback) {callback(err, null);}
                } else {
                    if(res2.password) {res2.password = undefined;}
                    if(callback) {callback(null, res2);}
                }
            });
        }
    });
}

var retreiveHostInfo = (hid, callback) => {
    schemas.Host.findById(hid, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            if(res.password) {res.password = undefined;}
            if(callback) {callback(null, res);}
        }
    });
}

var createEventHost = (hid, newEvent, callback) => {
    newEvent.eventHost = hid;
    event_functions.createEvent(newEvent, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            schemas.Host.findByIdAndUpdate(hid, {$push: {events: res._id}}, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(callback) {callback(null, res);}
                }
            });
        }
    });
};

var updateEventHost = (eid, update, callback) => {
    event_functions.updateEvent(eid, update, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var deleteEventHost = (hid, eid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$pull: {events: eid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            event_functions.deleteEvent(eid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(callback) {callback(null, res);}
                }
            });        
        }
    });
};

var addFollower = (hid, sid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$push: {followers: sid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var removeFollower = (hid, sid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$pull: {followers: sid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var addTag = (hid, tid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$push: {tags: tid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            tag_functions.addHost(tid, hid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null)}
                } else {
                    if(callback) {callback(null, res);}
                }
            });
        }
    });
};

var removeTag = (hid, tid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, {$pull: {tags: tid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            tag_functions.removeHost(tid, hid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null)}
                } else {
                    if(callback) {callback(null, res);}
                }
            });     
        }
    });
};

module.exports = {
    hostSignup: hostSignup,
    hostLogin: hostLogin,
    deleteHost: deleteHost,
    retreiveHostInfo: retreiveHostInfo,
    createEventHost: createEventHost,
    updateEventHost: updateEventHost,
    deleteEventHost: deleteEventHost,
    addFollower: addFollower,
    removeFollower: removeFollower,
    addTag: addTag,
    removeTag: removeTag
};
const schemas = require("../schemas/schemas");
const event_functions = require("./event");
const tag_functions = require("./tag");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Add functionality to check if an event's time has already
//passed so it can be moved to archived events

var hostSignup = (newHost, callback) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(newHost.password, salt);

    let host = {
        email: newHost.email.toLowerCase(),
        hostEmail: newHost.hostEmail.toLowerCase(),
        password: hash,
        hostName: newHost.hostName,
        description: newHost.description,
        tags: newHost.tags,
        phoneNumber: newHost.phoneNumber,
        website: newHost.website.toLowerCase(),
        imageURL: newHost.imageURL,
        expoPushToken: newHost.expoPushToken
    };

    let hostSave = new schemas.Host(host);

    hostSave.save()
        .then(async data => {
            for (let i = 0; i < newHost.tags.length; i++) {
                await tag_functions.addHost(newHost.tags[i], data._id);
            }

            let token = jwt.sign({ id: data._id, email: data.email, signInType: 'HOST' }, process.env.APP_SECRET, {
                expiresIn: 2592000 // 1 month
            });

            data.password = undefined;
            data.token = { id: data._id, email: data.email, token: token, signInType: 'HOST' };
            if (callback) { callback(null, data); }
        })
        .catch(err => {
            if (callback) { callback(err, null); }
        });
};

var isHostLogin = async (loginInfo, callback) => {
    try {
        let doc = await schemas.Host.findOne({ email: loginInfo.email });
        if (doc === null) {
            return false;
        }
        return true;
    } catch (error) {
        return null;
    }
};

var hostLogin = (loginInfo, callback) => {
    schemas.Host.findOne({ email: loginInfo.email }, (err, res) => {
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
            let token = jwt.sign({ id: res._id, email: res.email, signInType: 'HOST' }, process.env.APP_SECRET, {
                expiresIn: 2592000 // 1 month
            });
            if (callback) { callback(null, { id: res._id, email: res.email, token: token, signInType: 'HOST' }); }
        }
    });
};

var deleteHost = (hid, callback) => {
    schemas.Host.findById(hid, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            res.followers.forEach((follower, index) => {
                schemas.Student.findByIdAndUpdate(follower, { $pull: { following: hid } }, (err, res) => {
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
                if (err) {
                    if (callback) { callback(err, null); }
                } else {
                    if (res2.password) { res2.password = undefined; }
                    if (callback) { callback(null, res2); }
                }
            });
        }
    });
}

var retreiveHostInfo = (hid, callback) => {
    schemas.Host.findById(hid).populate('tags')
        .populate('events').populate('messages').exec(async (err, res) => {
            if (err) {
                if (callback) { callback(err, null); }
            } else {
                if (res == undefined) {
                    if (callback) { callback({ err: 'No host found.' }, null); }
                    return;
                }
                res.password = undefined;
                let ret = [];
                for (let i = 0; i < res.events.length; i++) {
                    ret.push(await schemas.Event.findById(res.events[i]._id).populate('eventHost').populate('updates').populate('tags').exec());
                }
                let messages = [];
                for(let i = 0; i < res.messages.length; i++) {
                    messages.push(await schemas.Messages.findById(res.messages[i]._id).populate({path: 'firstId', model: schemas.Student}).populate({path: 'secondId', model: schemas.Host}).exec());
                }
                res.events = ret;
                res.messages = messages;
                if (callback) { callback(null, res); }
            }
        });
}

var createEventHost = (hid, newEvent, callback) => {
    event_functions.createEvent(newEvent, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            schemas.Host.findByIdAndUpdate(hid, { $addToSet: { events: res._id } }, (err, res2) => {
                if (err) {
                    if (callback) { callback(err, null); }
                } else {
                    if (callback) { callback(null, res); }
                }
            });
        }
    });
};

var updateEventHost = (eid, update, callback) => {
    event_functions.updateEvent(eid, update, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

//Change this to archived events
var deleteEventHost = (hid, eid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, { $pull: { events: eid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            event_functions.deleteEvent(eid, (err, res2) => {
                if (err) {
                    if (callback) { callback(err, null); }
                } else {
                    if (callback) { callback(null, res); }
                }
            });
        }
    });
};

var addFollower = (hid, sid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, { $addToSet: { followers: sid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var removeFollower = (hid, sid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, { $pull: { followers: sid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var addTag = (hid, tid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, { $addToSet: { tags: tid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            tag_functions.addHost(tid, hid, (err, res2) => {
                if (err) {
                    if (callback) { callback(err, null) }
                } else {
                    if (callback) { callback(null, res); }
                }
            });
        }
    });
};

var removeTag = (hid, tid, callback) => {
    schemas.Host.findByIdAndUpdate(hid, { $pull: { tags: tid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            tag_functions.removeHost(tid, hid, (err, res2) => {
                if (err) {
                    if (callback) { callback(err, null) }
                } else {
                    if (callback) { callback(null, res); }
                }
            });
        }
    });
};

var cancelEventHost = (eid, callback) => {
    event_functions.cancelEvent(eid, callback);
}


//Update functions for hostName, hostEmail, phoneNumber, email,
//password, description, website, imageURL

module.exports = {
    hostSignup: hostSignup,
    isHostLogin: isHostLogin,
    hostLogin: hostLogin,
    deleteHost: deleteHost,
    retreiveHostInfo: retreiveHostInfo,
    createEventHost: createEventHost,
    updateEventHost: updateEventHost,
    deleteEventHost: deleteEventHost,
    addFollower: addFollower,
    removeFollower: removeFollower,
    addTag: addTag,
    removeTag: removeTag,
    cancelEventHost: cancelEventHost
};
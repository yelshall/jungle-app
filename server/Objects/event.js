const schemas = require('../schemas/schemas');
const update_functions = require('./update');
const tag_functions = require('./tag');

var createEvent = async (newEvent, callback) => {
    let event = new schemas.Event({
        eventName: newEvent.eventName,
        dateTime: newEvent.dateTime,
        endDateTime: newEvent.endDateTime,
        location: newEvent.location,
        tags: newEvent.tags,
        eventHost: newEvent.eventHost,
        description: newEvent.description,
        imageURL: newEvent.imageURL,
        maxStudents: newEvent.maxStudents,
        latitude: newEvent.latitude,
        longitude: newEvent.longitude,
        url: newEvent.url,
        media: newEvent.media,
        imageURL: newEvent.imageURL
    });

    event.save()
        .then((res) => {
            for(let i = 0; i < newEvent.tags.length; i++) {
                tag_functions.addEvent(newEvent.tags[i], res._id);
            }

            if (callback) { callback(null, res); }
        })
        .catch(err => {
            if (callback) { callback(err, null); }
        });
};

var deleteEvent = (eid, callback) => {
    schemas.Event.findByIdAndDelete(eid, function (err, deletedEvent) {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            for (let i = 0; i < deletedEvent.tags.length; i++) {
                tag_functions.removeEvent(deletedEvent.tags[i], deletedEvent._id);
            }

            for (let i = 0; i < deletedEvent.updates.length; i++) {
                update_functions.deleteUpdate(deletedEvent.update[i]);
            }

            for(let i = 0; i< deletedEvent.interestedStudents.length; i++) {
                schemas.Student.findByIdAndUpdate(deletedEvent.interestedStudents[i], { $pull: { interestedEvents: eid }}).exec();
            }

            for(let i = 0; i< deletedEvent.confirmedStudents.length; i++) {
                schemas.Student.findByIdAndUpdate(deletedEvent.confirmedStudents[i], { $pull: { confirmedEvents: eid }}).exec();
            }

            for(let i = 0; i< deletedEvent.unlikedStudents.length; i++) {
                schemas.Student.findByIdAndUpdate(deletedEvent.unlikedStudents[i], { $pull: { unlikedEvents: eid }}).exec();
            }

            if (callback) { callback(null, deletedEvent); }
        }
    });
    schemas.Event.findByIdAndDelete(eid, callback);
};

var cancelEvent = (eid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { cancelled: true, active: false }, callback)
};

var getEvent = (eid, callback) => {
    schemas.Event.findById(eid, callback);
};

var getEvents = (eventIds, callback) => {
    schemas.Event.aggregate([
        {
            $match: {
                "_id": { $nin: eventIds },
                "active": { $eq: true }
            }
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: 'tags'
            }
        }
    ]).exec(callback);
};

var updateEvent = (eid, update, callback) => {
    if (update.type === "CHANGE_FIELD") {
        switch (update.field) {
            case "EVENT_NAME":
                updateEventName(eid, update.newName, callback);
                break;
            case "EVENT_DATETIME":
                updateEventDateTime(eid, update.dateTime, callback);
                break;
            case "EVENT_ENDDATETIME":
                updateEventEndDateTime(eid, update.endDateTime, callback);
                break;
            case "EVENT_LOCATION":
                updateEventLocation(eid, update.location, callback);
                break;
            case "EVENT_MAXSTUDENTS":
                updateEventMaxStudents(eid, update.maxStudents, callback);
                break;
            case "EVENT_DESCRIPTION":
                updateEventDescription(eid, update.description, callback);
                break;
            case "EVENT_ADD_TAG":
                addTag(eid, update.tag, callback);
                break;
            case "EVENT_REMOVE_TAG":
                removeTag(eid, update.tag, callback);
                break;
            case "EVENT_ADD_MEDIA":
                addMedia(eid, update.media, callback);
                break;
            case "EVENT_REMOVE_MEDIA":
                removeMedia(eid, update.media, callback);
                break;
            case "EVENT_CHANGE_URL":
                updateEventURL(eid, update.url, callback);
                break;
            default:
                if (callback) { callback({ err: "Incorrect update field" }, null); }
                break;
        }
    } else if(update.type === "ADD") {
        switch(update.field) {
            case "INTERESTED_STUDENT":
                addInterestedStudent(update.eid, update.sid, callback);
                break;
            case "CONFIRMED_STUDENT":
                addConfirmedStudent(update.eid, update.sid, callback);
                break;
            case "UNLIKED_STUDENT":
                addUnlikedStudent(update.eid, update.sid, callback);
                break;
            case "MEDIA":
                addMedia(update.eid, update.media, callback);
                break;
            case "TAG":
                addTag(update.eid, update.tid, callback);
                break;
            default:
                if (callback) { callback({ err: "Incorrect update field" }, null); }
                break;
        }
    } else if(update.type === "REMOVE") {
        switch(update.field) {
            case "INTERESTED_STUDENT":
                removeInterestedStudent(update.eid, update.sid, callback);
                break;
            case "CONFIRMED_STUDENT":
                removeConfirmedStudent(update.eid, update.sid, callback);
                break;
            case "UNLIKED_STUDENT":
                removeUnlikedStudent(update.eid, update.sid, callback);
                break;
            case "MEDIA":
                removeMedia(update.eid, update.media, callback);
                break;
            case "TAG":
                removeTag(update.eid, update.tid, callback);
                break;
            default:
                if (callback) { callback({ err: "Incorrect update field" }, null); }
                break;
        }
    } else if(update.type === "NORMAL") {
        update_functions.createUpdate(update.title, update.message, update.notifyAll, eid, (err, res) => {
            if (err) {
                if (callback) { callback(err, null) }
                return;
            }
            schemas.Event.findByIdAndUpdate(eid, { $push: { updates: res._id } }, callback)
        });
    }
};

var addInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { interestedStudents: sid } }, callback);
};

var addConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { confirmedStudents: sid } }, callback);
};

var addUnlikedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { unlikedStudents: sid } }, callback);
};

var addTag = (eid, tid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { tags: tid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", 
            `A new tag has been added.`, false, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var removeInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { interestedStudents: sid } }, callback);
};

var removeConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { confirmedStudents: sid } }, callback);
};

var removeUnlikedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { unlikedStudents: sid } }, callback);
};

var removeTag = (eid, tid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { tags: tid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", 
            `A tag has been removed.`, false, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventName = (eid, newName, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { eventName: newName }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", 
            `The event's name has been changed to ${newName}.`, false, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventDateTime = (eid, newDateTime, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { dateTime: newDateTime }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", 
            `The event's date and time has been changed to ${dateTime}.`, true, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventEndDateTime = (eid, newDateTime, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { endDateTime: newDateTime }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!",
            `The event's date and time has been changed to ${dateTime}.`, true, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventLocation = (eid, newLocation, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { location: newLocation.location, 
        latitude: newLocation.latitude, longitude: newLocation.longitude }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!",
            `The event's location has been changed to ${location}.`, true, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventMaxStudents = (eid, newMaxStudents, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { maxStudents: newMaxStudents }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!",
            `The event's maximum number of attendees has been changed to ${newMaxStudents}.`, false, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventDescription = (eid, newDescription, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { description: newDescription }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!",
            `The event's description has been changed.`, false, eid);
            if (callback) { callback(null, res); }
        }
    });
};

var deleteUpdateEvent = (eid, uid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { updates: uid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.deleteUpdate(uid);
            if (callback) { callback(null, res); }
        }
    })
};

var addMedia = (eid, media, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { media: media } }, callback);
};

var removeMedia = (eid, media, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { media: media } }, callback);
};

var updateEventURL = (eid, url, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { url: url }, callback);
};

var updateEventActive = (eid, active, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {active: active}, callback);
};

var updateEventCancel = (eid, cancel, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {cancel: cancel}, callback);
};

module.exports = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent,
    getEvents: getEvents,
    getEvent: getEvent,
    addConfirmedStudent: addConfirmedStudent,
    addInterestedStudent: addInterestedStudent,
    addUnlikedStudent: addUnlikedStudent,
    removeConfirmedStudent: removeConfirmedStudent,
    removeInterestedStudent: removeInterestedStudent,
    removeUnlikedStudent: removeUnlikedStudent,
    addTag: addTag,
    removeTag: removeTag,
    updateEventName: updateEventName,
    updateEventDateTime: updateEventDateTime,
    updateEventLocation: updateEventLocation,
    updateEventMaxStudents: updateEventMaxStudents,
    updateEventDescription: updateEventDescription,
    deleteUpdateEvent: deleteUpdateEvent,
    addMedia: addMedia,
    removeMedia: removeMedia,
    updateEventURL: updateEventURL,
    cancelEvent: cancelEvent,
    updateEventActive: updateEventActive,
    updateEventCancel: updateEventCancel
};

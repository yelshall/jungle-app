const schemas = require('../schemas/schemas');
const tag_functions = require('../Objects/tag');
const update_functions = require('../Objects/update');

var createEvent = async (newEvent, callback) => {
    let event = {
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
    };

    if (event.url) event.url = event.url.toLowerCase();

    if (event.url) event.url = event.url.toLowerCase();

    let eventSave = new schemas.Event(event);

    try {
        let events = await schemas.Event.find({ eventName: newEvent.eventName });

        if (events == null || events.length == 0) {
            let ev = await eventSave.save()

            for (let i = 0; i < newEvent.tags.length; i++) {
                tag_functions.addEvent(newEvent.tags[i], ev._id);
            }

            if (callback) { callback(null, ev); }
        }
    } catch (err) {
        if (callback) { callback(err, null); }
        return;
    }
};

var deleteEvent = (eid, callback) => {
    schemas.Event.findByIdAndDelete(eid, async function (err, deletedEvent) {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            for (let i = 0; i < deletedEvent.tags.length; i++) {
                await tag_functions.removeEvent(deletedEvent.tags[i], deletedEvent._id);
            }

            for (let i = 0; i < deletedEvent.updates.length; i++) {
                await update_functions.deleteUpdate(deletedEvent.update[i]);
            }

            if (callback) { callback(null, deletedEvent); }
        }
    });
};

var cancelEvent = (eid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { cancelled: true, active: false }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
            return;
        }

        if (callback) { callback(null, res); }
    })
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
            case "EVENT_CHANGE_IMAGE":
                changeImage(eid, update.media, callback);
                break;
            case "EVENT_CHANGE_URL":
                changeURL(eid, update.url, callback);
                break;
            default:
                if (callback) { callback({ err: "Incorrect field" }, null); }
                break;
        }
    } else {
        update_functions.createUpdate(update.title, update.message, update.notifyAll, eid, (err, res) => {
            if (err) {
                if (callback) { callback(err, null) }
                return;
            }
            schemas.Event.findByIdAndUpdate(eid, { $push: { updates: res._id } }, (err, res) => {
                if (err) {
                    if (callback) { callback(err, null) }
                    return;
                }
                if (callback) { callback(null, res) }
            })
        });
    }
};

var retreiveEventInfo = (eid, callback) => {
    schemas.Event.findById(eid, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
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
    ]).exec((err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
            return;
        }
        if (callback) { callback(null, res); }
    });
};

var addInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { interestedStudents: sid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var addConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { confirmedStudents: sid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var addUnlikedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { unlikedStudents: sid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var removeInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { interestedStudents: sid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var removeConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { confirmedStudents: sid } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var addTag = (eid, newTag, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { tags: newTag } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `A new tag has been added.`, false, eid, callback);
            if (callback) { callback(null, res); }
        }
    });
};

var removeTag = (eid, removeTag, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { tags: removeTag } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `A tag has been removed.`, false, eid, callback);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventName = (eid, newName, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { eventName: newName }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's name has been changed to ${newName}.`, false, eid, callback);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventDateTime = (eid, newDateTime, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { dateTime: newDateTime }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's date and time has been changed to ${dateTime}.`, true, eid, callback);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventEndDateTime = (eid, newDateTime, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { endDateTime: newDateTime }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's date and time has been changed to ${dateTime}.`, true, eid, callback);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventLocation = (eid, newLocation, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { location: newLocation.location, latitude: newLocation.latitude, longitude: newLocation.longitude }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's location has been changed to ${location}.`, true, eid, callback);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventMaxStudents = (eid, newMaxStudents, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { maxStudents: newMaxStudents }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's maximum number of attendees has been changed to ${newMaxStudents}.`, false, eid, callback);
            if (callback) { callback(null, res); }
        }
    });
};

var updateEventDescription = (eid, newDescription, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { description: newDescription }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's description has been changed.`, false, eid, callback);
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
    schemas.Event.findByIdAndUpdate(eid, { $addToSet: { media: media } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var removeMedia = (eid, media, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { $pull: { media: media } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var changeImage = (eid, media, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { imageURL: media }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var changeURL = (eid, url, callback) => {
    schemas.Event.findByIdAndUpdate(eid, { url: url }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

module.exports = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent,
    getEvents: getEvents,
    retreiveEventInfo: retreiveEventInfo,
    addConfirmedStudent: addConfirmedStudent,
    addInterestedStudent: addInterestedStudent,
    addUnlikedStudent: addUnlikedStudent,
    removeConfirmedStudent: removeConfirmedStudent,
    removeInterestedStudent: removeInterestedStudent,
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
    changeImage: changeImage,
    changeURL: changeURL,
    cancelEvent: cancelEvent
};

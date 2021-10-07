const schemas = require('../schemas/schemas');
const tag_functions = require('../Objects/tag');
const update_functions = require('../Objects/update');

var createEvent = (newEvent, callback) => {
    //Possibly connect location to google maps
    let event = {
        eventName: newEvent.eventName,
        dateTime: newEvent.dateTime,
        endDateTime: newEvent.endDateTime,
        location: newEvent.location,
        tags: newEvent.tags,
        eventHost: newEvent.eventHost,
        description: newEvent.description,
    };

    if(newEvent.maxStudents) {event.maxStudents = newEvent.maxStudents;}

    let eventSave = new schemas.Event(event);
    
    eventSave.save()
    .then(data => {
        if(newEvent.tags) {
            tags.forEach((tag, index) => {
                tag_functions.addEvent(tag, data._id, callback);
            });
        }

        if (callback) {callback(null, data);}
    })
    .catch(err => {
        if (callback) {callback(err, null);}
    });
};

var deleteEvent = (eid, callback) => {
    schemas.Event.findByIdAndDelete(eid, function(err, deletedEvent) {
        if(err) {
            if (callback) {callback(err, null);}
        } else {
            if(deletedEvent.tags) {
                deletedEvent.tags.forEach((tag, index) => {
                    tag_functions.removeEvent(tag, deletedEvent._id, callback);
                });
            }

            if(deletedEvent.updates) {
                deletedEvent.updates.forEach((update, index) => {
                    update_functions.deleteUpdate(update, callback);
                });
            }

            if (callback) {callback(null, deletedEvent);}
        }
    });
};

var updateEvent = (eid, update, callback) => {
    if(update.type === "CHANGE_FIELD") {
        switch (update.field) {
            case "EVENT_NAME":
                updateEventName(eid, update.newName, callback);
                break;
            case "EVENT_DATETIME":
                updateEventDateTime(eid, update.dateTime, callback);
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
                addTag(eid, update.Tag, callback);
                break;
            case "EVENT_REMOVE_TAG":
                removeTag(eid, update.tag, callback);
                break;
            default:
                if(callback) {callback({err: "Incorrect field"}, null);}
                break;
        }
    } else {
        update_functions.createUpdate(update.title, update.message, update.notifyAll, eid, callback);
    }
};

var retreiveEventInfo = (eid, callback) => {
    schemas.Event.findById(eid, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var addInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$push: {interestedStudents: sid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var addConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$push: {confirmedStudents: sid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var removeInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$pull: {interestedStudents: sid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var removeConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$pull: {confirmedStudents: sid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var addTag = (eid, newTag, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$push: {tags: newTag}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.createUpdate("The host changed event details!", `A new tag has been added.`, false, eid, callback);
            if(callback) {callback(null, res);}
        }
    });
};

var removeTag = (eid, removeTag, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$pull: {tags: removeTag}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.createUpdate("The host changed event details!", `A tag has been removed.`, false, eid, callback);
            if(callback) {callback(null, res);}
        }
    });
};

var updateEventName = (eid, newName, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {eventName: newName}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's name has been changed to ${newName}.`, false, eid, callback);
            if(callback) {callback(null, res);}
        }
    });
};

var updateEventDateTime = (eid, newDateTime, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {dateTime: newDateTime}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's date and time has been changed to ${dateTime}.`, true, eid, callback);
            if(callback) {callback(null, res);}
        }
    });
};

var updateEventLocation = (eid, newLocation, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {location: newLocation}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's location has been changed to ${location}.`, true, eid, callback);
            if(callback) {callback(null, res);}
        }
    });
};

var updateEventMaxStudents = (eid, newMaxStudents, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {maxStudents: newMaxStudents}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's maximum number of attendees has been changed to ${newMaxStudents}.`, false, eid, callback);
            if(callback) {callback(null, res);}
        }
    });
};

var updateEventDescription = (eid, newDescription, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {location: newDescription}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.createUpdate("The host changed event details!", `The event's description has been changed.`, false, eid, callback);
            if(callback) {callback(null, res);}
        }
    });
};

var deleteUpdateEvent = (eid, uid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$pull: {updates: uid}}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            update_functions.deleteUpdate(uid);
            if(callback) {callback(null, res);}
        }
    })
};

module.exports = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent,
    retreiveEventInfo: retreiveEventInfo,
    addConfirmedStudent: addConfirmedStudent,
    addInterestedStudent: addInterestedStudent,
    removeConfirmedStudent: removeConfirmedStudent,
    removeInterestedStudent: removeInterestedStudent,
    addTag: addTag,
    removeTag: removeTag,
    updateEventName: updateEventName,
    updateEventDateTime: updateEventDateTime,
    updateEventLocation: updateEventLocation,
    updateEventMaxStudents: updateEventMaxStudents,
    updateEventDescription: updateEventDescription,
    deleteUpdateEvent: deleteUpdateEvent
};
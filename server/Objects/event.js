const schemas = require('../schemas/schemas');

var createEvent = (newEvent, callback) => {
    //Possibly connect location to google maps
    let event = {
        eventName: newEvent.eventName,
        dateTime: newEvent.dateTime,
        location: newEvent.location,
        tags: newEvent.tags,
        eventHost: newEvent.eventHost,
        description: newEvent.description,
    };

    if(newEvent.maxStudents) event.maxStudents = newEvent.maxStudents;

    let eventSave = new schemas.Event(event);
    
    eventSave.save()
    .then(data => {
        console.log('(SUCCESS) In createEvent: Event saved successfully');
        if (callback) callback(null, data);
    })
    .catch(err => {
        console.log('(ERROR) In createEvent: Failed to save event');
        if (callback) callback(err, null);
    });
};

var deleteEvent = (eid, callback) => {
    schemas.Event.remove({_id: eid}, function(err) {
        if(err) {
            if (callback) callback(err, null);
        } else {
            if (callback) callback(null, null);
        }
    });
};

var addInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$push: {interestedStudents: sid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var addConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$push: {confirmedStudents: sid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeInterestedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$pull: {interestedStudents: sid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeConfirmedStudent = (eid, sid, callback) => {
    schemas.Event.findByIdAndUpdate(eid, {$pull: {confirmedStudents: sid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

//Write functions to update event for all fields

module.exports = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    addConfirmedStudent: addConfirmedStudent,
    addInterestedStudent: addInterestedStudent,
    removeConfirmedStudent: removeConfirmedStudent,
    removeInterestedStudent: removeInterestedStudent
};
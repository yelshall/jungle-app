const schemas = require("../schemas/schemas");

var createUpdate = (title, message, notifyAll, eid, callback) => {
    let update = new schemas.Update({
        title: title,
        message: message,
        notifyAll: notifyAll,
        event: eid
    });

    update.save()
    .then(data => {
        if(callback) callback(null, data);
    })
    .catch(err => {
        if(callback) callback(err, null);
    });
};

var deleteUpdate = (uid, callback) => {
    schemas.Update.findByIdAndDelete(uid, function(err, deletedUpdate) {
        if(err) {
            if (callback) callback(err, null);
        } else {
            if (callback) callback(null, deletedUpdate);
        }
    });
};

module.exports = {
    createUpdate: createUpdate,
    deleteUpdate: deleteUpdate
};
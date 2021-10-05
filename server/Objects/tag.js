const verify = require("../utils/verify");
const schemas = require("../schemas/schemas");

var createTag = (tagName, callback) => {
    verify.checkTagExists(tagName, ret => {
        if(ret) {
            callback({err: "Tag Exists"}, null);
            return;
        }

        let tag = new schemas.Tag({
            tagName: tagName
        });

        tag.save()
        .then(data => {
            if (callback) callback(null, data);
        })
        .catch(err => {
            if (callback) callback(err, null);
        });
    });
};

var addEvent = (tid, eid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$push: {events: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeEvent = (tid, eid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$pull: {events: eid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });};

var addHost = (tid, hid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$push: {hosts: hid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

var removeHost = (tid, hid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$pull: {hosts: hid}}, (err, res) => {
        if(err) {
            if(callback) callback(err, null);
        } else {
            if(callback) callback(null, res);
        }
    });
};

module.exports = {
    createTag: createTag,
    addEvent: addEvent,
    removeEvent: removeEvent,
    addHost: addHost,
    removeHost: removeHost
};
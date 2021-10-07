const verify = require("../utils/verify");
const schemas = require("../schemas/schemas");
const event_functions = require("./event");
const host_functions = require("./host");

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
            if (callback) {callback(null, data);}
        })
        .catch(err => {
            if (callback) {callback(err, null);}
        });
    });
};

var deleteTag = (tid, callback) => {
    schemas.Tag.findById(tid, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            res.events.forEach((event, index) => {
                event_functions.removeTag(event, tid);
            });

            res.hosts.forEach((host, index) => {
                host_functions.removeTag(host, tid);
            });

            schemas.Tag.findByIdAndDelete(tid, (err, res2) => {
                if(err) {
                    if(callback) {callback(err, null);}
                } else {
                    if(callback) {callback(null, res2);}
                }
            });
        }
    });
};

var addEvent = (tid, eid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$push: {events: eid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var removeEvent = (tid, eid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$pull: {events: eid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });};

var addHost = (tid, hid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$push: {hosts: hid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

var removeHost = (tid, hid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$pull: {hosts: hid}}, (err, res) => {
        if (err) {
            if(callback) {callback(err, null);}
        } else {
            if(callback) {callback(null, res);}
        }
    });
};

module.exports = {
    createTag: createTag,
    deleteTag: deleteTag,
    addEvent: addEvent,
    removeEvent: removeEvent,
    addHost: addHost,
    removeHost: removeHost
};
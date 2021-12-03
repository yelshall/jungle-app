const verify = require("../utils/verify");
const schemas = require("../schemas/schemas");

var createTag = async (tagName, callback) => {
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

var getTag = (tid, callback) => {
    schemas.Tag.findById(tid, callback);
};

var getTags = (callback) => {
    schemas.Tag.find({}, callback)
};

var deleteTag = (tid, callback) => {
    schemas.Tag.findByIdAndDelete(tid, callback);
};

var addEvent = (tid, eid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$addToSet: {events: eid}}, callback);
};

var removeEvent = (tid, eid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$pull: {events: eid}}, callback);
};

var addHost = (tid, hid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$addToSet: {hosts: hid}}, callback);
};

var removeHost = (tid, hid, callback) => {
    schemas.Tag.findByIdAndUpdate(tid, {$pull: {hosts: hid}}, callback);
};

module.exports = {
    createTag: createTag,
    deleteTag: deleteTag,
    getTag: getTag,
    getTags: getTags,
    addEvent: addEvent,
    removeEvent: removeEvent,
    addHost: addHost,
    removeHost: removeHost
};
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
            if (callback) {callback(null, data);}
        })
        .catch(err => {
            if (callback) {callback(err, null);}
        });
    });
};

var getTag = (tid, callback) => {
    schemas.Tag.findById(tid, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
            return;
        }
        if(callback) {callback(null, res);}
    });
};

var deleteTag = (tid, callback) => {
    schemas.Tag.findById(tid, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        } else {
            console.log(res);
            res.events.forEach((event, index) => {
                console.log('event', event);
                schemas.Event.findByIdAndUpdate(event, {$pull: {tags: tid}}, (err, res) => {
                    return;
                });
            });

            res.hosts.forEach((host, index) => {
                console.log('host', host);
                schemas.Host.findByIdAndUpdate(host, {$pull: {tags: tid}}, (err, res) => {
                    return;
                });
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
    console.log('eid', eid);
    console.log('tid', tid);
    schemas.Tag.findByIdAndUpdate(tid, {$push: {events: eid}}, (err, res) => {
        console.log('resss', res);
        console.log(err);
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
    });
};

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
    getTag: getTag,
    addEvent: addEvent,
    removeEvent: removeEvent,
    addHost: addHost,
    removeHost: removeHost
};
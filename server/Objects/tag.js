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
    schemas.Tag.findById(tid, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
            return;
        }
        if(callback) {callback(null, res);}
    });
};

var getTags = (callback) => {
    schemas.Tag.find({}, (err, res) => {
        if(err) {
            if(callback) {callback(err, null);}
        }

        if(callback) {callback(null, res);}
    })
};

var deleteTag = async (tid, callback) => {
    try {
        var res = await schemas.Tag.findById(tid);

        res.events.forEach(async (event, index) => {
            await schemas.Event.findByIdAndUpdate(event, {$pull: {tags: tid}}).exec();
        });

        res.hosts.forEach(async (host, index) => {
            await schemas.Host.findByIdAndUpdate(host, {$pull: {tags: tid}}).exec();
        });
        
        await schemas.Tag.findByIdAndDelete(tid).exec();

        if(callback) {callback(null, res);}
        return tid;
    } catch (err) {
        if(callback) {callback(err, null);}
        return err;
    }
};

var addEvent = async (tid, eid, callback) => {
    try {
        var ret = await schemas.Tag.findByIdAndUpdate(tid, {$addToSet: {events: eid}}).exec();

        if(callback) {
            callback(null, ret);
        }
        return ret;
    } catch (err) {
        if(callback) {
            callback(err, null);
        }
        return err;
    }
};

var removeEvent = async (tid, eid, callback) => {
    try {
        var ret = await schemas.Tag.findByIdAndUpdate(tid, {$pull: {events: eid}}).exec();
        if(callback) {
            callback(null, ret);
        }
        return ret;
    } catch (err) {
        if(callback) {
            callback(err, null);
        }
        return err;
    }
};

var addHost = async (tid, hid, callback) => {
    try {
        var ret = await schemas.Tag.findByIdAndUpdate(tid, {$addToSet: {hosts: hid}}).exec();
        if(callback) {
            callback(null, ret);
        }
        return ret;
    } catch (err) {
        if(callback) {
            callback(err, null);
        }
        return err;
    }
};

var removeHost = async (tid, hid, callback) => {
    try {
        var ret = await schemas.Tag.findByIdAndUpdate(tid, {$pull: {hosts: hid}}).exec();
        if(callback) {
            callback(null, ret);
        }
        return ret;
    } catch (err) {
        if(callback) {
            callback(err, null);
        }
        return err;
    }
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
const schemas = require('../schemas/schemas');

var createMessages = (sid, hid, message, callback) => {
    let messages = new schemas.Messages({
        firstRef: 'Student',
        firstId: sid,
        secondRef: 'Host',
        secondId: hid,
        messages: [message]
    });

    messages.save()
        .then(res => {
            schemas.Student.findByIdAndUpdate(sid, { $push: { messages: res._id } }).exec();
            schemas.Host.findByIdAndUpdate(hid, { $push: { messages: res._id } }).exec();

            if (callback) { callback(null, res); }
        })
        .catch(err => {
            if (callback) { callback(err, null); }
        });
}

var sendMessage = (mid, message, callback) => {
    schemas.Messages.findByIdAndUpdate(mid, { $push: { messages: message } }, (err, res) => {
        if (err) {
            if (callback) { callback(err, null); }
        } else {
            if (callback) { callback(null, res); }
        }
    });
};

var getMessages = (sid, hid, callback) => {
    schemas.Messages.find({ firstId: sid, secondId: hid })
        .populate({ path: 'firstId', model: schemas.Student })
        .populate({ path: 'secondId', model: schemas.Host })
        .exec((err, res) => {
            if (err) {
                if (callback) { callback(err, null); }
            } else {
                if (res.length != 0 && res != null) {
                    res[0].firstId.password = null;
                    res[0].secondId.password = null;
                }

                if (callback) { callback(null, res); }
            }
        });
};

module.exports = {
    createMessages: createMessages,
    sendMessage: sendMessage,
    getMessages: getMessages
}
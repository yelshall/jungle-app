const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    interestedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    recommendedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    confirmedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    }],
    metadata: {
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
});

const hostSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hostName: {
            type: String,
            required: true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    metadata: {
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
});

//URL Image
const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    interestedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    confirmedStudents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
    }],
    maxStudents: {
        type: Number,
        required: false,
        default: -1
    },
    eventHost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    },
    description: {
        type: String,
        required: true
    },
    updates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Update'
    }],
    metadata: {
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
});

const TagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    hosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    }],
    metadata: {
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
});

const updateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    notifyAll: {
        type: Boolean,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    metadata: {
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
});

const notificationSchema = new mongoose.Schema({
    notificationType: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    triggerTime: {
        type: Date,
        required: true
    },
    metadata: {
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = {
    Student: mongoose.model('Student', studentSchema),
    Host: mongoose.model('Host', hostSchema),
    Event: mongoose.model('Event', eventSchema),
    Tag: mongoose.model('Tag', TagSchema),
    Update: mongoose.model('Update', updateSchema),
    Notification: mongoose.model('Notification', notificationSchema)
};
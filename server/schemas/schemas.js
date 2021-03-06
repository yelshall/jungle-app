const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    imageURL: {
        type: String,
        default: ""
    },
    expoPushToken: {
        type: String,
        default: ""
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
    unlikedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event' 
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
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
    expoPushToken: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    hostEmail: {
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
        required: false,
        default: ""
    },
    website: {
        type: String,
        required: false,
        default: ""
    },
    imageURL: {
        type: String,
        default: ""
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
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
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
    latitude: {
        type: String,
        default: ""
    },
    longitude: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: ""
    },
    media: [{
        type: String
    }],
    imageURL: {
        type: String,
        default: 'https://bloximages.newyork1.vip.townnews.com/purdueexponent.org/content/tncms/assets/v3/editorial/8/c6/8c68927a-c2db-11ea-9f84-bb549081b729/5f08b46f175b6.image.jpg?resize=1200%2C899'
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
    unlikedStudents: [{
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
        ref: 'Host',
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    updates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Update'
    }],
    active: {
        type: Boolean,
        default: true
    },
    cancelled: {
        type: Boolean,
        default: false
    },
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
    imageURL: {
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

const messagesSchema = new mongoose.Schema({
    firstRef: {
        type: String
    },
    firstId: {
        type: mongoose.Schema.Types.ObjectId
    },
    secondRef: {
        type: String
    },
    secondId: {
        type: mongoose.Schema.Types.ObjectId
    },
    messages: {
        type: Array,
        default: []
    },
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

//Recommendation algorithm schemas
const user_factors = mongoose.model('user_factors', (new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId,
	e1: mongoose.Schema.Types.Number,
	e2: mongoose.Schema.Types.Number,
	e3: mongoose.Schema.Types.Number,
	e4: mongoose.Schema.Types.Number,
	e5: mongoose.Schema.Types.Number
})));

const event_factors = mongoose.model('event_factors', (new mongoose.Schema({
	event_id: mongoose.Schema.Types.ObjectId,
	e1: mongoose.Schema.Types.Number,
	e2: mongoose.Schema.Types.Number,
	e3: mongoose.Schema.Types.Number,
	e4: mongoose.Schema.Types.Number,
	e5: mongoose.Schema.Types.Number
})));


module.exports = {
    Student: mongoose.model('Student', studentSchema),
    Host: mongoose.model('Host', hostSchema),
    Event: mongoose.model('Event', eventSchema),
    Tag: mongoose.model('Tag', TagSchema),
    Update: mongoose.model('Update', updateSchema),
    Notification: mongoose.model('Notification', notificationSchema),
    Messages: mongoose.model('Messages', messagesSchema),
	user_factors: user_factors,
	event_factors: event_factors
};
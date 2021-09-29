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
    tags: [
        { type: Schema.Types.ObjectId, ref: 'Tag' }
    ],
    notifications: [
        { type: Schema.Types.ObjectId, ref: 'Notification' }
    ],
    interestedEvents: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ],
    recommendedEvents: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ],
    confirmedEvents: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ],
    following: [
        { type: Schema.Types.ObjectId, ref: 'Host' }
    ]
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
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    tags: [
        { type: Schema.Types.ObjectId, ref: 'Tag' }
    ],
    notifications: [
        { type: Schema.Types.ObjectId, ref: 'Notification' }
    ],
    interestedEvents: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ],
    recommendedEvents: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ],
    confirmedEvents: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ],
    following: [
        { type: Schema.Types.ObjectId, ref: 'Host' }
    ]
});


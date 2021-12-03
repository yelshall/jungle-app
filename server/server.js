const PORT = process.env.PORT || 3000;
const express = require('express');
const host = require('./Objects/host');
const student = require('./Objects/student');
const event = require('./Objects/event');
const tag = require('./Objects/tag');
const verify = require('./utils/verify');
const scraper = require('./utils/scraper');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const schemas = require('./schemas/schemas');
const messages = require('./Objects/messages');
const s3 = require('./utils/s3');
const { Expo } = require('expo-server-sdk');
let expo = new Expo();
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: './config/.env' });

mongoose.connect(process.env.DATABASE_ACCESS);

let what = 0;
if (what == 1) {
    schemas.Event.deleteMany({}).exec();
    schemas.Tag.updateMany({}, { events: [], hosts: [] }).exec();
    schemas.Student.deleteMany({}).exec();
    schemas.Host.deleteMany().exec();
    schemas.Update.deleteMany().exec();
    schemas.Messages.deleteMany().exec();
    scraper.getEvents(new Date(), new Date('2022-06-01'), async (err, res) => {
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[i].events.length; j++) {
                await event.createEvent(res[i].events[j]);
            }
        }
    });
} else if (what == 2) {
    schemas.Tag.find().exec((err, res) => {
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            let arr = array.slice(0, 5);
            for(let i = 0; i < 5; i++) {
                arr[i] = arr[i]._id;
            }
            return arr;
        }

        for(let i = 0; i < 500; i++) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync('testPassword', salt);

            let student = new schemas.Student({
                email: `testsstudent${i}@mail.com`,
                password: hash,
                fullName: {
                    firstName: 'Test',
                    lastName: `Student ${i}`
                },
                birthDate: new Date(),
                gender: 'Male',
                tags: shuffle(res),
                imageURL: 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png',
                expoPushToken: ''
            });

            student.save().then((res) => {});
        }
    });
} else if (what == 3) {
    schemas.Student.find({}).exec((err, res) => {
        schemas.Event.find({}).exec((err, res2) => {
            for(let i = 0; i < res.length; i++) {
                for(let j = 0; j < res2.length; j++) {
                    if(res[i].tags.indexOf(res2[j].tags[0]) != -1) {
                        if(Math.random() < 0.95) {
                            student.addInterestedEvent(res[i]._id, res2[j]._id);
                        } else {
                            student.addUnlikedEvent(res[i]._id, res2[j]._id);
                        }
                    } else {
                        student.addUnlikedEvent(res[i]._id, res2[j]._id);
                    }
                }
            }
        });
    });
}
const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

var connectedUsers = [];

io.on('connection', (socket) => {
    //Set the socketId and userId
    socket.on('setId', (request) => {
        if (connectedUsers.filter(user => user.userId == request.id).length > 0) {
            connectedUsers = [...connectedUsers.filter(user => user.userId != request.id)];
        }

        if (connectedUsers.filter(user => user.socketId == socket.id).length > 0) {
            connectedUsers = [...connectedUsers.filter(user => user.socketId != socket.id)];
        }

        connectedUsers.push({ socketId: socket.id, userId: request.id });
    });

    //To check if email exists on signup
    socket.on('verifyEmail', (request, callback) => {
        verify.checkEmailExists(request.email, (check) => {
            if (check) {
                callback({ err: 'Email exists' }, null);
                return;
            }

            callback(null, { res: 'Email does not exist' });
        });
    });

    socket.on('login', async (request, callback) => {
        let isStudentLogin = await student.isStudentLogin(request);
        let isHostLogin = await host.isHostLogin(request);

        if (isStudentLogin) {
            student.loginStudent(request, callback);
        } else if (isHostLogin) {
            host.loginHost(request, callback);
        } else {
            callback({ err: "INCORRECT_EMAIL" }, null);
        }
    });

    socket.on('verifyToken', (request, callback) => {
        try {
            let decoded = jwt.verify(request.token, process.env.APP_SECRET);
            decoded.iat = undefined;
            decoded.exp = undefined;

            student.getStudent(decoded.id, (err, res) => {
                if (err) {
                    host.getHost(decoded.id, (err, res) => {
                        if (err) {
                            callback(err, null);
                            return;
                        }

                        callback(null, { email: decoded.email, id: decoded.id, signInType: decoded.signInType });
                    });
                    return;
                }

                callback(null, { email: decoded.email, id: decoded.id, signInType: decoded.signInType });
            });
        } catch (err) {
            callback(err, null);
        }
    });

    socket.on('getTags', (request, callback) => {
        tag.getTags((err, res) => {
            if (err) {
                callback(err, null);
                return;
            }

            for (let i = 0; i < res.length; i++) {
                res[i].metadata = undefined;
                res[i].events = undefined;
                res[i].hosts = undefined;
            }

            callback(null, res);
        })
    });

    socket.on('getRecommendedEvents', (request, callback) => {
        student.getStudent(request.sid, (err, res1) => {
            if (err) {
                callback(err, null);
                return;
            }

            let eventIds = [];

            for (let i = 0; i < res1.interestedEvents.length; i++) {
                eventIds.push(res1.interestedEvents[i]._id);
            }

            for (let i = 0; i < res1.confirmedEvents.length; i++) {
                eventIds.push(res1.confirmedEvents[i]._id);
            }

            for (let i = 0; i < res1.unlikedEvents.length; i++) {
                eventIds.push(res1.unlikedEvents[i]._id);
            }

            event.getEvents(eventIds, (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }

                let arr = [];

                function shuffle(array) {
                    let currentIndex = array.length, randomIndex;

                    // While there remain elements to shuffle...
                    while (currentIndex != 0) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex--;

                        // And swap it with the current element.
                        [array[currentIndex], array[randomIndex]] = [
                            array[randomIndex], array[currentIndex]];
                    }

                    return array;
                }

                function sameDay(d1, d2) {
                    return d1.getFullYear() === d2.getFullYear() &&
                        d1.getMonth() === d2.getMonth() &&
                        d1.getDate() === d2.getDate();
                }

                var numDaysBetween = function (d1, d2) {
                    var diff = Math.abs(d1.getTime() - d2.getTime());
                    return diff / (1000 * 60 * 60 * 24);
                };

                if (request.filter.type == 'tags') {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].tags.filter(tag => tag._id == request.filter.id) != 0) {
                            arr.push(res[i]);
                        }
                    }
                } else if (request.filter.type == 'date') {
                    if (request.filter.date.date == 'day') {
                        arr = res.filter(event => sameDay(new Date(event.dateTime), new Date()));
                    } else if (request.filter.date.date == 'week') {
                        arr = res.filter(event => numDaysBetween(new Date(event.dateTime), new Date()) <= 7);
                    } else {
                        arr = res.filter(event => numDaysBetween(new Date(event.dateTime), new Date()) <= 30);
                    }
                } else {
                    arr = res;
                }

                if(arr.length == 0) {
                    callback({err: 'NO_EVENTS'}, null);
                    return;
                }

                callback(null, shuffle(arr).slice(0, arr.length > 20 ? 20 : arr.length));
            });
        });
    });

    socket.on('sendMessage', (request, callback) => {
        messages.sendMessage(request.mid, request.message, (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }

            let sendTo = connectedUsers.filter(user => user.userId == request.receiverId);

            if (sendTo.length != 0) {
                io.to(sendTo[0].socketId)
                    .emit('newMessage', { message: request.message, mid: res._id });
            }

            if (res.firstId == request.receiverId) {
                schemas.Host.findById(res.secondId).exec((err, res1) => {
                    schemas.Student.findById(request.receiverId).exec((err, res) => {
                        if (err) {
                            return;
                        }

                        let messages = [];
                        if (!Expo.isExpoPushToken(res.expoPushToken)) {
                            return;
                        }

                        messages.push({
                            to: res.expoPushToken,
                            sound: 'default',
                            body: `${res1.hostName}: ${request.message.text}`,
                            data: { withSome: 'Push an update!' },
                        })


                        let chunks = expo.chunkPushNotifications(messages);
                        let tickets = [];
                        (async () => {
                            for (let chunk of chunks) {
                                try {
                                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                                    tickets.push(...ticketChunk);
                                } catch (error) {
                                    console.error(error);
                                }
                            }
                        })();
                    });
                });
            } else {
                schemas.Student.findById(res.first).exec((err, res1) => {
                    schemas.Host.findById(request.receiverId).exec((err, res) => {
                        if (err) {
                            return;
                        }

                        let messages = [];
                        if (!Expo.isExpoPushToken(res.expoPushToken)) {
                            return;
                        }

                        messages.push({
                            to: res.expoPushToken,
                            sound: 'default',
                            body: `${res1.fullName.firstName} ${res1.fullName.lastName}: ${request.message.text}`,
                            data: { withSome: 'Push an update!' },
                        })


                        let chunks = expo.chunkPushNotifications(messages);
                        let tickets = [];
                        (async () => {
                            for (let chunk of chunks) {
                                try {
                                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                                    tickets.push(...ticketChunk);
                                } catch (error) {
                                    console.error(error);
                                }
                            }
                        })();
                    });
                });
            }

            callback(null, res);
        });
    });

    socket.on('getMessages', (request, callback) => {
        messages.getMessages(request.sid, request.hid, (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }

            callback(null, res);
        })
    });

    socket.on('createMessages', (request, callback) => {
        messages.createMessages(request.sid, request.hid, request.message, (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }

            let sendTo = connectedUsers.filter(user => user.userId == request.receiverId);

            if (sendTo.length != 0) {
                io.to(sendTo[0].socketId)
                    .emit('newMessage', { message: request.message, mid: res._id });
            }

            callback(null, res);
        });
    });

    socket.on('uploadImage', async (request, callback) => {
        const url = await s3.generateUploadURL();
        callback(null, url);
    });

    studentListeners(socket);
    hostListeners(socket);
});

var studentListeners = (socket) => {
    socket.on('createStudent', (request, callback) => {
        student.createStudent(request, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, { id: ret._id, email: ret.token.email, token: ret.token.token, signInType: 'STUDENT' }) };
        });
    });

    socket.on('getStudent', (request, callback) => {
        student.getStudent(request.sid, async (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }

            for (let i = 0; i < res.confirmedEvents.length; i++) {
                res.confirmedEvents[i] = await schemas.Event.findById(res.confirmedEvents[i]._id).populate('eventHost').populate('tags').populate('updates').exec();
            }

            for (let i = 0; i < res.interestedEvents.length; i++) {
                res.interestedEvents[i] = await schemas.Event.findById(res.interestedEvents[i]._id).populate('eventHost').populate('tags').populate('updates').exec();
            }

            callback(null, res);
        });
    });

    socket.on('updateStudent', (request, callback) => {
        student.updateStudent(request.sid, request.update, (err, res) => {
        });
    });
};

var hostListeners = (socket) => {
    socket.on('createHost', (request, callback) => {
        host.createHost(request.newHost, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, { id: ret._id, email: ret.token.email, token: ret.token.token, signInType: 'HOST' }) };
        });
    });

    socket.on('getHost', (request, callback) => {
        host.getHost(request.hid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('pushUpdate', (request, callback) => {
        let update = {
            type: 'PUSH_UPDATE',
            title: request.title,
            message: request.message,
            notifyAll: request.notifyAll
        };

        host.updateEventHost(request.eid, update, (err, res) => {
            if (err) {
                callback(err, null);
            }

            schemas.Host.findById(request.hid).populate('followers').exec((err, res) => {
                if (err) {
                    return;
                }

                let messages = [];
                for (let i = 0; i < res.followers.length; i++) {
                    if (!Expo.isExpoPushToken(res.followers[i].expoPushToken)) {
                        continue;
                    }

                    messages.push({
                        to: res.followers[i].expoPushToken,
                        sound: 'default',
                        body: `${res.hostName} has a push an update to one of their events!`,
                        data: { withSome: 'Push an update!' },
                    })
                }

                let chunks = expo.chunkPushNotifications(messages);
                let tickets = [];
                (async () => {
                    for (let chunk of chunks) {
                        try {
                            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                            tickets.push(...ticketChunk);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })();
            });

            callback(null, res);
        })
    });
};
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

require('dotenv').config({ path: './config/.env' });

mongoose.connect(process.env.DATABASE_ACCESS);

// schemas.Event.deleteMany({}).exec();
// schemas.Tag.updateMany({events: []}).exec();
// schemas.Student.updateMany({interestedEvents: [], confirmedEvents: []}).exec();
// schemas.Host.updateMany({events: []}).exec();

// scraper.getEvents(new Date(), new Date('2022-06-01'),async (err, res) => {
//     for(let i = 0; i < res.length; i++) {
//         for(let j = 0; j < res[i].events.length; j++) {
//             await event.createEvent(res[i].events[j]);
//         }
//     }
// });

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
    socket.on('setId', (request) => {
        if(connectedUsers.filter(user => user.userId == request.id).length > 0) {
            connectedUsers = [...connectedUsers.filter(user => user.userId != request.id)];
        }

        if(connectedUsers.filter(user => user.socketId == socket.id).length > 0) {
            connectedUsers = [...connectedUsers.filter(user => user.socketId != socket.id)];
        }

        connectedUsers.push({ socketId: socket.id, userId: request.id });
    });

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
            student.studentLogin(request, (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        } else if (isHostLogin) {
            host.hostLogin(request, (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        } else {
            callback({ err: "INCORRECT_EMAIL" }, null);
        }
    });

    socket.on('verifyToken', (request, callback) => {
        try {
            let decoded = jwt.verify(request.token, process.env.APP_SECRET);
            decoded.iat = undefined;
            decoded.exp = undefined;

            student.retreiveStudentInfo(decoded.id, (err, res) => {
                if (err) {
                    host.retreiveHostInfo(decoded.id, (err, res) => {
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

    socket.on('getFollowing', (request, callback) => {
        student.retreiveStudentInfo(request.uid, (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }

            callback(null, res.following);
        });
    });

    socket.on('getEvents', (request, callback) => {
        student.retreiveStudentInfo(request.sid, (err, res1) => {
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

            event.getEvents(20, eventIds, (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }

                let arr = res;

                callback(null, arr);
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
            
            if(sendTo.length != 0) {
                io.to(sendTo[0].socketId)
                .emit('newMessage', {message: request.message, mid: res._id});
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
            
            if(sendTo.length != 0) {
                io.to(sendTo[0].socketId)
                .emit('newMessage', {message: request.message, mid: res._id});    
            }

            callback(null, res);
        });
    });

    studentListeners(socket);
    hostListeners(socket);
});

//Possible other events for students:
//Retreive list of interested and confirmed events
//Retreive list of hosts
var studentListeners = (socket) => {
    socket.on('studentSignup', (request, callback) => {
        student.studentSignup(request, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, { id: ret._id, email: ret.token.email, token: ret.token.token, signInType: 'STUDENT' }) };
        });
    });

    socket.on('retreiveStudentInfo', (request, callback) => {
        student.retreiveStudentInfo(request.sid, (err, res) => {
            if(err) {
                callback(err, null);
                return;
            }

            callback(null, res);
        })
    });

    socket.on('getStudentEvents', (request, callback) => {
        student.retreiveStudentInfo(request.sid, async (err, res) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            for (let i = 0; i < res.confirmedEvents.length; i++) {
                res.confirmedEvents[i] = await schemas.Event.findById(res.confirmedEvents[i]._id).populate('eventHost').populate('tags').exec();
            }

            for (let i = 0; i < res.interestedEvents.length; i++) {
                res.interestedEvents[i] = await schemas.Event.findById(res.interestedEvents[i]._id).populate('eventHost').populate('tags').exec();
            }

            if (callback) { callback(null, { confirmedEvents: res.confirmedEvents, interestedEvents: res.interestedEvents }) }
        })

    });

    socket.on('addInterestedEvent', (request, callback) => {
        student.addInterestedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('addConfirmedEvent', (request, callback) => {
        student.addConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('addUnlikedStudent', (request, callback) => {
        student.addUnlikedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('removeInterestedEvent', (request, callback) => {
        student.removeInterestedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('removeConfirmedEvent', (request, callback) => {
        student.removeConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('followHost', (request, callback) => {
        student.followHost(request.uid, request.hid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('unfollowHost', (request, callback) => {
        student.unfollowHost(request.uid, request.hid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });
};

//Possible events to listen for in hosts:
//Retreive list of events
var hostListeners = (socket) => {
    socket.on('hostSignup', (request, callback) => {
        host.hostSignup(request.newHost, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, { id: ret._id, email: ret.token.email, token: ret.token.token, signInType: 'HOST' }) };
        });
    });

    socket.on('createEventHost', (request, callback) => {
        host.createEventHost(request.hid, request.newEvent, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }
            if (callback) { callback(null, ret) };
        });
    });

    socket.on('updateEventHost', (request, callback) => {
        host.updateEventHost(request.eid, request.update, (err, res) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }
            if (callback) { callback(null, res) };
        });
    });

    socket.on('deleteEventHost', (request, callback) => {
        host.deleteEventHost(request.hid, request.eid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });

    socket.on('retreiveHostInfo', (request, callback) => {
        host.retreiveHostInfo(request.hid, (err, ret) => {
            if (err) {
                if (callback) { callback(err, null) };
                return;
            }

            if (callback) { callback(null, ret) };
        });
    });
};
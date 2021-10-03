
//Global Variables
const PORT = process.env.PORT || 3000;
const express = require('express');
const host = require('./Objects/host');
const student = require('./Objects/student');
const verify = require('./utils/verify');
const app = express();

//Start Server
const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    socket.on('verifySignup', (request, callback) => {
        if(request.type == 'EMAIL') {
            verify.checkEmailExists(request.email, (ret) => {
                if(ret) {
                    callback({err: 'Email exists'});
                    return;
                }
                
                callback({ret: 'Email does not exist'});
            });
        } else if(request.type == 'USERNAME') {
            verify.checkUsernameExists(request.username, (ret) => {
                if(ret) {
                    callback({err: 'Username exists'});
                    return;
                }
                
                callback({ret: 'Username does not exist'});
            });
        }
    });

    studentListeners(socket);
    hostListeners(socket);
});

//Possible other events for students:
//Retreive list of interested and confirmed events
//Retreive list of hosts
var studentListeners = (socket) => {
    socket.on('studentSignup', (request, callback) => {
        student.studentSignup(request.newStudent, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('studentLogin', (request, callback) => {
        //Implement later
    });

    socket.on('addInterestedEvent', (request, callback) => {
        student.addInterestedEvent(request.uid, request.eid, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('addConfirmedEvent', (request, callback) => {
        student.addConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('removeInterestedEvent', (request, callback) => {
        student.removeInterestedEvent(request.uid, request.eid, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('removeConfirmedEvent', (request, callback) => {
        student.removeConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('followHost', (request, callback) => {
        student.followHost(request.uid, request.eid, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('unfollowHost', (request, callback) => {
        student.unfollowHost(request.uid, request.eid, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });
};

//Possible events to listen for in hosts:
//Retreive list of events
var hostListeners = (socket) => {
    socket.on('hostSignup', (request, callback) => {
        host.hostSignup(request.newHost, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('hostLogin', (request, callback) => {
        //Implement Later
    });

    socket.on('createEventHost', (request, callback) => {
        host.createEventHost(request.newEvent, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });

    socket.on('updateEventHost', (request, callback) => {
        //Implement Later
    });

    socket.on('deleteEventHost', (request, callback) => {
        host.deleteEventHost(request.hid, request.eid, (err, ret) => {
            if(err) {
                callback({err: err});
                return;
            }

            callback({ret: ret});
        });
    });
};
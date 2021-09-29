
//Global Variables
const PORT = process.env.PORT || 3000;
const express = require('express');
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
    socket.on('studentSignup', (request) => {
        
    });

    socket.on('studentLogin', (request) => {

    });
});
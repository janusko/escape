const express = require('express');
const cors = require('cors')
const app = express();

require('dotenv').config();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

require('./configs/mongoose.config')

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

require('./routes/airbnb.routes')(app); 
const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

const io = require('socket.io')(server, {cors: true});
let users = [];

// Establishes connection to React app
io.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    // creates a unique Id for each socket

    // * Listens when a new user joins the server
    socket.on('newUser', (data) => {
        users.push(data);
        // username and socket id are pushes to users array
        io.emit('newUserResponse', users)
        // sends array of users back to client-side
    })

    //  * Listens for client-side message event
    socket.on('message', (data) => {
        console.log(data);
        io.emit(`messageResponse`, data)
        // now send message to all connect clients
    });

    // * Listens for client-side typing cevent
    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
    // now using typingResponse event to send data back to user -> ChatPage -> ChatBody

    //  Disconnects whenever you refresh or close the browser
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
        users = users.filter((user) => user.socketId !== socket.id)
        // updates list of users whenever a user disconnects
        io.emit(`newUserResponse`, users)
        // now sends new list of users (without disconnected user) back to client-side
        socket.disconnect();
    });
});
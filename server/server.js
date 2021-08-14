const express = require('express');
const cors = require('cors');
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: [ "GET", "POST" ]
    }
})

const rooms = {};


require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000']
}));

require('./config/mongoose.config');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);
require('./routes/comment.routes')(app);
require('./routes/trip.routes')(app);
const port = 8000;
// app.listen(port, () => console.log(`Listening on port: ${port}`) );

io.on("connection", socket => {
    socket.on("join room", roomID => {

            console.log(socket.id);
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
});


server.listen(8000, () => console.log('server is running on port 8000'));
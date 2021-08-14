const express = require('express');
const cors = require('cors');
const app = express();


require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('./config/mongoose.config');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);
require('./routes/comment.routes')(app);
require('./routes/trip.routes')(app);

const port = 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`) );

///////////////////////////////////////////////// socket.io
    // const io = require('socket.io')(server, { cors: true });
    // var clients = {}
    // io.on('connection', socket => {
    //   clients[socket.id] = socket;
    //   console.log('new user id is :' + socket.id);
    //   socket.on('message', ({ name, message }) => {
    //     io.emit('message', { name, message })
    //
    //   })
    //   socket.on('disconnect', function() {
    //     delete clients[socket.id];
    //     console.clear();
    //     console.log('deleted user id is :' + "["+socket.id+"]" );
    //
    // });
    // })

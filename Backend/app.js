var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var userRouter = require('./api/routes/user.route.js');
var chatRouter = require('./api/routes/chat.route.js');
var messageRouter = require('./api/routes/message.route.js');
const mongoose = require('mongoose');

//Connection URI to mongo
const uri = 'mongodb://127.0.0.1:27017/LiveChatAppDb';

//Making Connection (asynchronously)

mongoose.connect(uri)
    .then( result => {
        console.log("Connected Successfully");
    })
    .catch( error => console.log(error));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({'origin': 'http://localhost:3001'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/users',userRouter);
app.use('/api/chats',chatRouter);
app.use('/api/messages',messageRouter);

const server = app.listen(5000, console.log("Server Running"));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
  },
  pingTimeout: 60000,
})

io.on("connection", (socket) => {
  socket.on("setup",(user) => {
    socket.join(user.data._id);
    socket.emit("connected");
  });

  socket.on("join chat",(room) => {
    socket.join(room);
  });

  socket.on("new message",(newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if(!chat.users){
      console.log("Users not defined");
    }
    chat.users.forEach((user) => {
      if(user._id == newMessageStatus.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

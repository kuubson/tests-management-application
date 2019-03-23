const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;

const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const passport = require('passport');

require('./config/passport')(passport);
require('./config/socket-io')(io);

const mongoose = require('mongoose');
const db = require('./config/db').MongoDB_URI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Connected to database!')).catch(err => console.log("Could not connect to database!"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/users', require('./routes/users'));
app.use('/test', require('./routes/test'));

http.listen(port, () => console.log(`Server started at port ${port}`));
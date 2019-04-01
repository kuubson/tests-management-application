const dotenv = require('dotenv');
require('./config/dotenv')(dotenv);

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3001;
const path = require('path');

const io = require('socket.io')(http);
require('./config/socket-io')(io);

const mongoose = require('mongoose');
require('./config/db-connect')(mongoose);

const passport = require('passport');
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/', require('./routes/registerUser'));
app.use('/', require('./routes/loginUser'));
app.use('/', require('./routes/getUser'));
app.use('/', require('./routes/getTest'));
app.use('/', require('./routes/saveQuestion'));
app.use('/', require('./routes/saveResult'));
app.use('/', require('./routes/getResult'));
app.use('/', require('./routes/getNewestResult'));

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


http.listen(port, () => console.log(`Server started at port ${port}`));



const dotenv = require('dotenv');
require('./config/dotenv')(dotenv);

const mongoose = require('mongoose');
require('./config/db-connect')(mongoose);

const passport = require('passport');
require('./config/passport')(passport);

const port = process.env.PORT || 3001;

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/getUser'));
app.use('/', require('./routes/getTest'));

http.listen(port, () => console.log(`Server started at port ${port}`));



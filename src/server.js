const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;

const express = require('express');
const app = express();
const passport = require('passport');
require('./config/passport')(passport);

const mongoose = require('mongoose');
const db = require('./config/db').MongoDB_URI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Connected to database!')).catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/users', require('./routes/users'));
app.use('/test', require('./routes/test'));

app.listen(port, () => console.log(`Server started at port ${port}`));
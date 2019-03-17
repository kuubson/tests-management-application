const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001;
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = require('./config/db').MongoDB_URI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Connected to database!')).catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));

app.listen(port, () => console.log(`Server started at port ${port}`));
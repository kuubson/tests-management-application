const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/db').MongoDB_URI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Connected to database!')).catch(err => console.log(err));

//Trying implement JWT ---------------------------------------------------

const User = require('./models/User');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
}
const strategy = new JwtStrategy(opts, (payload, next) => {
    User.findOne({ login: payload }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
    })
})
passport.use(strategy);

//Trying implement JWT ---------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/users', require('./routes/users'));

app.listen(port, () => console.log(`Server started at port ${port}`));
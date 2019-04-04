const User = require('../models/User');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (payload, done) => {
            User.findOne({ login: payload.login }, (err, user) => {
                if (err) return done(err, false);
                if (!user) return done(null, false);
                if (user) return done(null, user);
            })
        }))
}

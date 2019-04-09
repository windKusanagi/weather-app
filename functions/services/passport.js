/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const passport = require("passport");
const User = require("../models/user.js");
const config = require("../config/config.js");
var JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: config.secretKey
};

const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	// Verify email and password
	User.findOne({ email: email }, function(err, user){
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
        }
		// Compare the encrepted password using the salt
        user.comparePassword(password, function(err, isMatch){
			if(err) return done(err)
			if (!isMatch) return done(null, false)
            return done(null, user)
        } )
    });
});

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	// See if the user ID in the payload exists in our database
	User.findById(payload.sub, function(err, user){
		if (err) {
			return done(err, false);
		}
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const User = require("../models/user");
const jwt = require("jwt-simple");
const config =  require("../config/config");

function UserToken (user){
    const timestamp = new Date().getTime();
	return jwt.encode({ sub: user._id, iat: timestamp }, config.secretKey);
}

exports.signin = (req, res, next) => {
	res.send({ token: UserToken(req.user)});
}

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res
			.status(422)
			.send({ error: "You must provide email and password" });
	}
	// Check if a user with the given email exists
	User.findOne({ email: email }, function(err, existingUser){
		if (err) {
			return next(err);
		}
		// If a user with email exists, return an error
		if (existingUser) {
			return res.status(422).send({ error: "Email is in use" });
		}
	});

	// If a user with the email does NOT exist, create and save the new user
	const user = new User({
		email: email,
		password: password
	});

	user.save((err) => {
		if (err) {
			return next(err);
		}
		// Send the token back to the user
		res.status(201).send({ token: UserToken(user)});
	});
	
};

/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define the user model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: { type: String, minlength: 8 }
});

// On Save Hook, encrypt password
userSchema.pre("save", function(next) {
	const user = this;
	// generate a salt then run the callback function
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			// overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;

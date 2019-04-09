const functions = require("firebase-functions");
const express = require("express");
const authentication = require("./controllers/authentication");
const passportSetup = require("./services/passport");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");
const app = express();

// App Setip
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

mongoose.connect(
	config.connectKey,
	{
		reconnectTries: 100,
		reconnectInterval: 500,
		autoReconnect: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		dbName: "test"
	}
)
	.then(() => {
		console.log("Connected to database!");
		return;
	})
	.catch(err => console.log("Mongo connection error", err));

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

app.get("/greeting", requireAuth, (req, res) => res.send({ hi: "there" }));
app.post("/signin", requireSignin, authentication.signin);
app.post("/signup", authentication.signup);
app.get("/hello", (req, res) => res.send({ hi: "hello world" }))

exports.app = functions.https.onRequest(app);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require("./models/userModel");
const passportConfig = require("./config/passport/passport");

const app = express();

// Application middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.set("trust proxy", 1);
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.DBURL,
			collectionName: "session",
		}),
		cookie: {
			secure: false,
		},
	})
);

// Passport session management
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const existingUser = await UserModel.findOne({ userName: username });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new UserModel({
			userName: username,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(201).redirect("/login");
	} catch (error) {
		res.status(500).json({ success: false, data: { error: error.message } });
	}
});

// auth checker

const checkLogIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect("/profile");
	}
	next();
};

app.get("/login", checkLogIn, (req, res) => {
	res.render("login");
});

app.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login",
		successRedirect: "/profile",
	})
);

app.get("/logout", (req, res) => {
	try {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.redirect("/");
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

// check auth user 
const checkAuthenticateUser = ( req, res, next ) => {
    if ( req.isAuthenticated() ) {
        return next();
    }
    res.redirect("login")
}

app.get("/profile", checkAuthenticateUser,(req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect("/login");
	}
	res.render("profile");
});

app.get("/health", (req, res) => {
	res.status(200).json({ success: true, data: { message: "ok,success" } });
});

app.get("/", (req, res) => {
	res.render("index");
});

// Error handlers
app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		success: false,
		data: { message: error.message || "Server error" },
	});
});

module.exports = app;

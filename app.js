const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ejs = require("ejs");
const path = require("path");

const app = express();

// Application middleware

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

// user register route (get)

app.get("/register", (req, res) => {
	res.render("register");
});

// user register route (post)
app.post("/register", (req, res) => {
	try {
		res.status(201).json({
			success: true,
			data: {
				message: "user created successfully ",
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			data: {
				error: error.message,
			},
		});
	}
});

// user login route (get)
app.get("/login", (req, res) => {
	res.render("login");
});

// user login route (post)
app.post("/login", (req, res) => {
	try {
		res.status(200).json({
			success: true,
			data: {
				message: "user login successfully",
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			data: {
				error: error.message,
			},
		});
	}
});

// user logout route (post)
app.get("/logout", (req, res) => {
	res.redirect("/");
});

// user profile route (get) --> for authenticate user can access only (protected)
app.get("/profile", (req, res) => {
	res.render("profile");
});

//health route

app.get("/health", (req, res) => {
	res.status(200).json({
		success: true,
		data: {
			message: "welcome to the auth-service",
		},
	});
});

// Root route
app.get("/", (req, res) => {
	res.render("index");
});

// error handler

app.use((req, res, next) => {
	class NotFoundError extends Error {
		constructor(message) {
			super(message);
			this.status = 404;
		}
	}
	const error = new NotFoundError("sorry, server not found!");
	next(error);
});

// server error handler

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		success: false,
		data: {
			message: error.message || "server error occurs",
		},
	});
});

module.exports = app;

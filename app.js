const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Application middleware

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		data: {
			message: "welcome to the auth-service",
		},
	});
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

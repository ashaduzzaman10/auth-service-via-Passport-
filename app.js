require("dotenv").config();
const express = require("express");
const passport = require("./config/passport/passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const { notFoundHandler, serverError } = require("./error/error");
const { commonMiddleware } = require("./middleware/common");
const userRegisterRoute = require("./router/userRegisterRoute");
const { userLogInRoute } = require("./router/userloginRoute");
const { userLogOutRoute } = require("./router/userLogOutRoute");
const userProfileRoute = require("./router/userProfileRoute");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Application middleware
app.use(commonMiddleware);

// Session management
app.set("trust proxy", 1);
app.use(
	session({
		secret: process.env.SESSION_SECRET || "keyboard cat",
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.DBURL,
			collectionName: "session",
		}),
		cookie: {
			secure: process.env.NODE_ENV === "production",
		},
	})
);

// Passport session management
app.use(passport.initialize());
app.use(passport.session());

// User routes
app.use(userRegisterRoute);
app.use(userLogInRoute);
app.use(userLogOutRoute);
app.use(userProfileRoute);

app.get("/health", (req, res) => {
	res.status(200).json({ success: true, data: { message: "ok,success" } });
});

app.get("/", (req, res) => {
	res.render("index");
});

// Error handlers
app.use(notFoundHandler);
app.use(serverError);

module.exports = app;

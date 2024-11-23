const userLogInRoute = require("express").Router();
const {
	userLogPage,
	userLogInController,
} = require("../controller/userLogInController");
const { checkLogIn } = require("../middleware/authCheck");

userLogInRoute.get("/login", checkLogIn, userLogPage);

userLogInRoute.post("/login", checkLogIn, userLogInController);

module.exports = {
	userLogInRoute,
};

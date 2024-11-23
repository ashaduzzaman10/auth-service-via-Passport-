const userProfileController = require("../controller/userProfileController");
const { checkAuthenticateUser } = require("../middleware/authCheck");

const userProfileRoute = require("express").Router();

userProfileRoute.get("/profile", checkAuthenticateUser, userProfileController);

module.exports = userProfileRoute;

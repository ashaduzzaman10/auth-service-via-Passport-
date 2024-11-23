const passport = require("passport");

const userLogInController = passport.authenticate("local", {
	failureRedirect: "/login",
	successRedirect: "/profile",
});

const userLogPage = (req, res) => {
	res.render("login");
};

module.exports = {
	userLogInController,
	userLogPage,
};

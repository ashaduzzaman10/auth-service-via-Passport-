// check auth user
const checkAuthenticateUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("login");
};

// auth checker

const checkLogIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect("/profile");
	}
	next();
};

module.exports = { checkAuthenticateUser, checkLogIn };
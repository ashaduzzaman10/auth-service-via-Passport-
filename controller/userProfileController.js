const userProfileController = (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect("/login");
	}
	res.render("profile");
};

module.exports = userProfileController;

const userLogOutRoute = require("express").Router();

userLogOutRoute.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = {
    userLogOutRoute,
};
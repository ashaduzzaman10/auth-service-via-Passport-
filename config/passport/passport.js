const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserModel = require("../../models/userModel");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ userName: username });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

module.exports = passport;
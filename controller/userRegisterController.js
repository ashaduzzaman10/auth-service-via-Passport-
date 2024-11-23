const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerPage = (req, res) => {
    res.render("register");
};

const userRegisterProcess = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ userName: username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            userName: username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).redirect("/login");
    } catch (error) {
        res.status(500).json({ success: false, data: { error: error.message } });
    }
};

module.exports = {
    registerPage,
    userRegisterProcess,
};
const userRegisterRoute = require("express").Router();

const {
    registerPage,
    userRegisterProcess,
} = require("../controller/userRegisterController");

// Routes

userRegisterRoute.get("/register", registerPage);

userRegisterRoute.post("/register", userRegisterProcess);

module.exports = userRegisterRoute;
const express = require("express");
const {login} = require ("../controllers/authController");

const userRouter = express.Router ();

userRouter.route("/login").post (login);

module.exports = userRouter;
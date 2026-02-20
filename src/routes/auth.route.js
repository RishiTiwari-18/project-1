const express = require("express")
const { registerController, loginController } = require("../controllers/auth.controller")
const authRouter = express.Router()

authRouter.post("/register", registerController)

authRouter.post("/login", loginController)


module.exports = authRouter


//? login flow
// 1. user sends the request
// 2. we check if the user exist or not if not the we return  user not found
// 3. if user exist we check the password is password is wrong we send error else login
// 4. Create tooken   

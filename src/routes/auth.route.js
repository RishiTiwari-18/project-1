const express = require("express")
const { registerController, loginController, getMeController } = require("../controllers/auth.controller")
const verifyToken = require("../middlewares/verifytoken")
const authRouter = express.Router()

authRouter.post("/register", registerController)

authRouter.post("/login", loginController)

authRouter.get("/get-me", verifyToken, getMeController)


module.exports = authRouter


//? login flow
// 1. user sends the request
// 2. we check if the user exist or not if not the we return  user not found
// 3. if user exist we check the password is password is wrong we send error else login
// 4. Create tooken   


// monolith folder structure  microservices folder structure
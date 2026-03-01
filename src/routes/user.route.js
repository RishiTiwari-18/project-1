const express = require("express")
const verifyToken = require("../middlewares/verifytoken")
const { followUserController, unfollowUserController } = require("../controllers/user.controller")

const userRouter = express()

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */

userRouter.post("/follow/:userid", verifyToken, followUserController)
userRouter.delete("/unfollow/:userid", verifyToken, unfollowUserController)


module.exports = userRouter
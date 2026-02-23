const express = require("express")
const { createPostController, getPostController, getPostDetailController } = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require("multer")
const verifyToken = require("../middlewares/verifytoken")
const upload = multer({storage:multer.memoryStorage()})

postRouter.post("/", verifyToken ,upload.single("image"), createPostController)

postRouter.get("/", verifyToken, getPostController)

postRouter.get("/details/:id", verifyToken, getPostDetailController)

module.exports = postRouter




// so to see the files uploded form the frontend we need the multer package as a middleware in our api
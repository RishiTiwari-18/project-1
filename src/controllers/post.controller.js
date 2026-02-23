// const postModel = require("../models/post.model");
const { toFile } = require('@imagekit/nodejs')
const ImageKit = require('@imagekit/nodejs');
const postModel = require('../models/post.model');

const imageKit = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY']
});

const createPostController = async (req, res) => {
    try {
        const user = req.id
        const { caption }= req.body
        const file = await imageKit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), 'file'),
            fileName: 'test',
            folder: 'insta-clone'
        });

        const post = await postModel.create({
            user, caption, imgUrl: file.url
        })

        res.status(201).json({
            success: true,
            message: "Post created",
            data: post
        })

    } catch (error) {
        res.send(error.message)
    }

}

const getPostController = async (req, res) => {
    try {
        const id = req.id
        const post = await postModel.find({user: id})

        res.status(200).json({
            success: false,
            data: post
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }   
}

const getPostDetailController = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.id
        


        const post = await postModel.findById(postId)

        if(!post){
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }

        const isAuthorized = post.user.toString() === userId

        if(!isAuthorized){
            res.status(403).json({      //? Status 403 signals that access to a requested resource is intentionally denied, regardless of valid credentials.
                success: false,
                message: "Not allowed to access this post"
            })
        }

        return res.status(200).json({
            succes: true,
            data: post
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


}

module.exports = { createPostController, getPostController, getPostDetailController }
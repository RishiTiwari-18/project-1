const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")

const registerController = async (req, res) => {
    try {
        const { username, email, password, bio, profile_image } = req.body

        const IsUserAlreadyExist = await UserModel.findOne({
            $or: [{ username }, { email }]
        })

        if(IsUserAlreadyExist){
            return res.status(409).json({
                success: false,
                message: "User Already exist" + (IsUserAlreadyExist.email == email ? " with this email" : " with this Username")
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            username, email, password: hashPassword, bio, profile_image
        })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        
        res.cookie("token", token)

        return res.status(201).json({
            success: true,
            message: "User registered",
            data: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profile_image: user.profile_image
            }
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const loginController = async (req, res) => {
    try {
        const {username, email, password} = req.body

        const user = await UserModel.findOne({
            $or: [{email}, {username}]
        }) 

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(401).json({
                success: false,
                messsage: "Password Invalid"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:"7d"})
        res.cookie("token", token)

        res.status(200).json({
            succes: true,
            message: "User logged in",
            data: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profile_image: user.profile_image
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { registerController, loginController}
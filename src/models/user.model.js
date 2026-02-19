const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exist" ],
        require: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exist" ],
        require: [true, "Email is required"]
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    bio: String,
    profile_image: {
        type: String,
        default:"https://ik.imagekit.io/ar22lxnhj8/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp"
    }
})

const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel



// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         unique: [true, "Username already exist"],
//         required: [true, "Username is required"]
//     },
//     email:{
//         type: String,
//         unique: [true, "Email already exist"],
//         required: [true, "Email is required"]
//     },
//     password: {
//         type: String,
//         required: [true, "Password is required"]
//     },
//     bio: String,
//     profile_image: {
//        type: String,
//        default: "https://ik.imagekit.io/ar22lxnhj8/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp"
//     }
// },{
//     timestamps: true
// })

// const userModel = mongoose.model("User", userSchema)
//  module.exports = userModel
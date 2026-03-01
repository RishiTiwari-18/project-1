const mongoose = require("mongoose")

const followShema = new mongoose.Schema({
    follower: {     // someone who is following other
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },
    followee: {     // someone who is being followed
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "Followee is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum:{
            values:["pending", "accepted", "rejected"],
            message: "Status can only be pending, accepted or rejected"
        }
    }
},{
    timestamps: true,
})

followShema.index({follower: 1, followee: 1}, { unique: true })

const followModel = mongoose.model("follows", followShema)

module.exports = followModel
const followModel = require("../models/follow.model");
const UserModel = require("../models/user.model");



const followUserController = async (req, res) => {
  try {
    const follower = req.user.id;
    const followee = req.params.userid;

    if (followee === follower) {
      return res.status(400).json({
        success: false,
        message: "You can't follow yourself",
      });
    }

    const isFolloweeExists = await UserModel.exists({ _id: followee }); //! .exist return only teh id no teh full document so its much lighter and faster

    if (!isFolloweeExists) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // const isAlreadyFollowing = await followModel.findOne({
    //     followee,                                                      //! not required because I have index unique in schema
    //     follower
    // })

    // if(isAlreadyFollowing){
    //     return res.status(200).json({
    //         message: `You are already Following the user`
    //     })
    // }

    const followRecord = await followModel.create({
      follower,
      followee,
    });

    return res.status(201).json({
      success: true,
      follow: followRecord,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Already following",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const unfollowUserController = async (req, res) => {
  try {
    const follower = req.user.id;
    const followee = req.params.userid;

    const deleted = await followModel.findOneAndDelete({ followee, follower });

    if (!deleted) {
      return res.status(400).json({
        message: "you are not following this user",
      });
    }

    return res.status(200).json({
      message: "You have unfollowed the user",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { followUserController, unfollowUserController };

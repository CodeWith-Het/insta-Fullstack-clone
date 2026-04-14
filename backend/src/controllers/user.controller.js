const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followingUsername = req.params.username;
    
    if (followerUsername == followingUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }

    const isUserExist = await userModel.findOne({
        username: followingUsername
    })
    if (!isUserExist) {
        return res.status(404).json({
            message: "You are trying to follow a user that does not exist"
        })
    }
    
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        following:followingUsername
    })

    if (isAlreadyFollowing) {
        return res.status(400).json({
          message: "You are already following this user",
        });
  }
  
  const followData = await followModel.create({
    follower: followerUsername,
    following: followingUsername,
  });

  res.status(201).json({
    message: `You are now following ${followingUsername}`,
    follow: followData,
  });
}

async function unfollowUserController(req,res) {
  const followerUsername = req.user.username
  const followingUsername = req.params.username

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    following:followingUsername
  })

  if (!isUserFollowing) {
    return res.status(400).json({
      message:"You are not Following this person"
    })
  }

  await followModel.findByIdAndDelete(isUserFollowing._id)
  
  res.status(200).json({
    message: `You have unfollowed ${followingUsername}`
  })
}

async function sendFollowRequestController(req, res) {

  try{
  const senderUsername = req.user.username
  const recevierUsername = req.params.username

  // self follow request is not allowed
  if (senderUsername == recevierUsername) {
    return res.status(400).json({
      message: "You cannot send a follow request to yourself"
    })
  }

  // user should exist to send follow request
  const isUserExist = await userModel.findOne({
    username: recevierUsername
  })

  if (!isUserExist) {
    return res.status(404).json({
      message: "The user you are trying to follow does not exist",
      username: recevierUsername
    })
  }

  //user should not have an existing follow relationship with the receiver
  const isExistingRelation = await followModel.findOne({
    follower: senderUsername,
    following: recevierUsername
  })

  if (isExistingRelation) {
    if (isExistingRelation.status == "accepted") {
      return res.status(400).json({
        message: `You are already following ${recevierUsername}`,
        status: "accepted"
      })
    }

    if (isExistingRelation.status == "pending") {
      return res.status(400).json({
        message: `You have already sent a follow request to ${recevierUsername}`,
        status: "pending"
      })
    }

    if (isExistingRelation.status === "rejected") {
      isExistingRelation.status = "pending";
      await isExistingRelation.save();

      return res.status(200).json({
        message: `Follow request sent again to ${recevierUsername}`,
        status: "pending",
        followRequest: isExistingRelation,
      });
    }
  }

  // user send follow request 
  const followRequest = await followModel.create({
    follower: senderUsername,
    following: recevierUsername
  })

  res.status(201).json({
    message: `Follow request sent to ${recevierUsername}`,
    followRequest: followRequest
  })
  }
  
  // handling duplicate key error when there is already a follow request in pending state
  catch (error) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Follow request already exists",
      });
    }

     res.status(500).json({
       message: err.message,
     });
    
  }
}

async function acceptFollowRequestController(req, res) {
  try {
    const receiverUsername = req.user.username
    const senderUsername = req.params.username

    const followRequest = await followModel.findOne({
      follower: senderUsername,
      following: receiverUsername,
    })

    if (!followRequest) {
      return res.status(404).json({
        message: "Follow request not found",
      })
    }

    if (followRequest.status === "accepted") {
      return res.status(400).json({
        message: "You have already accepted this follow request",
      })
    }

    if (followRequest.status === "rejected") {
      return res.status(400).json({
        message: "You have already rejected this follow request",
      })
    }

    if (followRequest.status !== "pending") {
      return res.status(400).json({
        message: "Invalid follow request status",
      })
    }

    followRequest.status = "accepted"
    await followRequest.save()

    res.status(200).json({
      message: `You have accepted the follow request from ${senderUsername}`,
      followRequest: followRequest.status,
      follower: followRequest.follower,
      following: followRequest.following
    })
  }

  catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

async function rejectFollowRequestController(req, res) {
  try {
    const receiverUsername = req.user.username
    const senderUsername = req.params.username

    const followRequest = await followModel.findOne({
      follower: senderUsername,
      following: receiverUsername
    })

    if (!followRequest) {
      return res.status(404).json({
        message: "Follow request not found"
      })
    }

    if(followRequest.status === "accepted") {
      return res.status(400).json({
        message: "You have already accepted this follow request"
      })
    }

    if(followRequest.status === "rejected") {
      return res.status(400).json({
        message: "You have already rejected this follow request"
      })
    }

    if(followRequest.status !== "pending") {
      return res.status(400).json({
        message: "Invalid follow request status"
      })
    }  

    followRequest.status = "rejected"
    await followRequest.save()

    res.status(200).json({
      message: `You are rejected the follow request from ${senderUsername}`,
      follower: followRequest.follower,
      following: followRequest.following,
      followRequest:followRequest.status
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  sendFollowRequestController,
  acceptFollowRequestController,
  rejectFollowRequestController
};

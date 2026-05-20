const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  try {
    const followerUsername = req.user.username;
    const followingUsername = req.params.username;

    if (followerUsername == followingUsername) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const isUserExist = await userModel.findOne({
      username: followingUsername,
    });
    if (!isUserExist) {
      return res
        .status(404)
        .json({
          message: "You are trying to follow a user that does not exist",
        });
    }

    const isAlreadyFollowing = await followModel.findOne({
      follower: followerUsername,
      following: followingUsername,
    });

    if (isAlreadyFollowing) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    const followData = await followModel.create({
      follower: followerUsername,
      following: followingUsername,
      status: "accepted", // Direct follow ka status accepted
    });

    // Count Updates
    await userModel.findOneAndUpdate(
      { username: followingUsername },
      { $inc: { followersCount: 1 } },
    );
    await userModel.findOneAndUpdate(
      { username: followerUsername },
      { $inc: { followingCount: 1 } },
    );

    res.status(201).json({
      message: `You are now following ${followingUsername}`,
      follow: followData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function unfollowUserController(req, res) {
  try {
    const followerUsername = req.user.username;
    const followingUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
      follower: followerUsername,
      following: followingUsername,
    });

    if (!isUserFollowing) {
      return res
        .status(400)
        .json({ message: "You are not Following this person" });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    if (isUserFollowing.status === "accepted") {
      await userModel.findOneAndUpdate(
        { username: followingUsername },
        { $inc: { followersCount: -1 } },
      );
      await userModel.findOneAndUpdate(
        { username: followerUsername },
        { $inc: { followingCount: -1 } },
      );
    }

    res
      .status(200)
      .json({ message: `You have unfollowed ${followingUsername}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function sendFollowRequestController(req, res) {
  try {
    const senderUsername = req.user.username;
    const recevierUsername = req.params.username;

    if (senderUsername == recevierUsername) {
      return res
        .status(400)
        .json({ message: "You cannot send a follow request to yourself" });
    }

    const isUserExist = await userModel.findOne({ username: recevierUsername });
    if (!isUserExist) {
      return res
        .status(404)
        .json({ message: "The user you are trying to follow does not exist" });
    }

    const isExistingRelation = await followModel.findOne({
      follower: senderUsername,
      following: recevierUsername,
    });

    if (isExistingRelation) {
      if (isExistingRelation.status == "accepted") {
        return res
          .status(400)
          .json({
            message: `You are already following ${recevierUsername}`,
            status: "accepted",
          });
      }

      if (isExistingRelation.status == "pending") {
        return res
          .status(400)
          .json({
            message: `You have already sent a follow request to ${recevierUsername}`,
            status: "pending",
          });
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

    const followRequest = await followModel.create({
      follower: senderUsername,
      following: recevierUsername,
      status: "pending",
    });

    res.status(201).json({
      message: `Follow request sent to ${recevierUsername}`,
      followRequest: followRequest,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Follow request already exists" });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function acceptFollowRequestController(req, res) {
  try {
    const receiverUsername = req.user.username;
    const senderUsername = req.params.username;

    const followRequest = await followModel.findOne({
      follower: senderUsername,
      following: receiverUsername,
    });

    if (!followRequest) {
      return res.status(404).json({ message: "Follow request not found" });
    }
    if (followRequest.status === "accepted") {
      return res
        .status(400)
        .json({ message: "You have already accepted this follow request" });
    }
    if (followRequest.status !== "pending") {
      return res.status(400).json({ message: "Invalid follow request status" });
    }

    followRequest.status = "accepted";
    await followRequest.save();

    // FIXED: Response bhejne se pehle Count Updates karo
    await userModel.findOneAndUpdate(
      { username: receiverUsername },
      { $inc: { followersCount: 1 } },
    );
    await userModel.findOneAndUpdate(
      { username: senderUsername },
      { $inc: { followingCount: 1 } },
    );

    res.status(200).json({
      message: `You have accepted the follow request from ${senderUsername}`,
      followRequest: followRequest.status,
      follower: followRequest.follower,
      following: followRequest.following,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function rejectFollowRequestController(req, res) {
  try {
    const receiverUsername = req.user.username;
    const senderUsername = req.params.username;

    const followRequest = await followModel.findOne({
      follower: senderUsername,
      following: receiverUsername,
    });

    if (!followRequest) {
      return res.status(404).json({ message: "Follow request not found" });
    }
    if (followRequest.status === "accepted") {
      return res
        .status(400)
        .json({ message: "You have already accepted this follow request" });
    }
    if (followRequest.status !== "pending") {
      return res.status(400).json({ message: "Invalid follow request status" });
    }

    // UPDATE: Faltu status save karne ki jagah seedha document delete kar do
    await followModel.findByIdAndDelete(followRequest._id);

    res.status(200).json({
      message: `You rejected the follow request from ${senderUsername}`,
      follower: followRequest.follower,
      following: followRequest.following,
      followRequest: "rejected",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getMyPendingRequestsController(req, res) {
  try {
    const myUsername = req.user.username;

    const pendingRequests = await followModel.find({
      following: myUsername,
      status: "pending",
    });

    res.status(200).json({
      message: "Pending requests fetched",
      requests: pendingRequests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  sendFollowRequestController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getMyPendingRequestsController,
};

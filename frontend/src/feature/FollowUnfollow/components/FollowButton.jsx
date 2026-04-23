import React, { useState } from "react";
import { useFollow } from "../hooks/useFollow"; // Path check kar lena

const FollowButton = ({ username, initialStatus = "none" }) => {
  // Hook se functions nikale
  const { handleFollow, handleUnFollow, handleSendFollowRequest, loading } =
    useFollow();

  // State jo char (4) cheezein handle karegi: "none", "pending", "accepted", "rejected"
  const [status, setStatus] = useState(initialStatus);

  const onToggle = async () => {
    if (!username) return;

    try {
      // SCENARIO 1: Agar pehle se Following ya Requested hai, toh click karne par Cancel/Unfollow hoga
      if (status === "accepted" || status === "pending") {
        await handleUnFollow(username); // Ye backend se record delete kar dega
        setStatus("none");
      }
      // SCENARIO 2: Agar Follow karna hai ya pehle Reject ho chuka tha (wapas request bhejni hai)
      else if (status === "none" || status === "rejected") {
        // YAHAN MAIN CHANGE HAI: Ab hum seedha Request bhej rahe hain!
        await handleSendFollowRequest(username);
        setStatus("pending"); // Button turant "Requested" ban jayega
      }
    } catch (error) {
      console.error("Follow action failed:", error);
    }
  };

  // UI (Text aur Color) change karne ka logic
  let btnText = "Follow";
  let btnClass = "";

  if (status === "pending") {
    btnText = "Requested";
    btnClass = "following"; // Grey background ke liye
  } else if (status === "accepted") {
    btnText = "Following";
    btnClass = "following"; // Grey background ke liye
  } else if (status === "rejected") {
    btnText = "Rejected";
    btnClass = "following"; // isko tu chahe toh red color ki nayi class de sakta hai
  }

  return (
    <button
      className={`follow-btn ${btnClass}`}
      onClick={onToggle}
      disabled={loading}
    >
      {loading ? "Wait..." : btnText}
    </button>
  );
};

export default FollowButton;

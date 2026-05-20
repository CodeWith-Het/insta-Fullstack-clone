import React, { useState } from "react";
import { useFollow } from "../hooks/useFollow";
import "../styles/followButton.scss";

const FollowButton = ({ username, initialStatus = "none" }) => {

  const myUsername =
    JSON.parse(localStorage.getItem("user"))?.username || "CodeWith-Het"; // Isko apne actual state se replace karna

  // Hook se functions nikale
  const { handleFollow, handleUnFollow, handleSendFollowRequest, loading } =
    useFollow();

  // State jo char (4) cheezein handle karegi: "none", "pending", "accepted", "rejected"
  const [status, setStatus] = useState(initialStatus);

  // 2. CHECK: Kya main khud ki profile dekh raha hu?
  const isMe = myUsername === username;

  const onToggle = async () => {
    // Agar username nahi hai, ya fir user khud click kar raha hai, toh return kardo
    if (!username || isMe) return;

    try {
      // SCENARIO 1: Agar pehle se Following ya Requested hai, toh click karne par Cancel/Unfollow hoga
      if (status === "accepted" || status === "pending") {
        await handleUnFollow(username); // Ye backend se record delete kar dega
        setStatus("none");
      }
      // SCENARIO 2: Agar Follow karna hai ya pehle Reject ho chuka tha (wapas request bhejni hai)
      else if (status === "none" || status === "rejected") {
        await handleSendFollowRequest(username);
        setStatus("pending"); // Button turant "Requested" ban jayega
      }
    } catch (error) {
      console.error("Follow action failed:", error);
    }
  };

  // 3. Agar ye "Main Khud" hu, toh seedha ek disabled button return kardo
  // (Isse niche ka color change wala code chalega hi nahi)
  if (isMe) {
    return (
      <button
        className="follow-btn following"
        disabled
        style={{ opacity: 0.6, cursor: "not-allowed" }}
      >
        It's You
      </button>
    );
  }

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
    btnClass = "following";
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

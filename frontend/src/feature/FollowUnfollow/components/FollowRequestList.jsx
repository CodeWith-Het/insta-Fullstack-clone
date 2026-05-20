import React, { useEffect, useState } from "react";
import { useFollow } from "./../hooks/useFollow";
import "../styles/followRequestList.scss";

const FollowRequestList = () => {
  const {
    fetchPendingRequests,
    handleAcceptFollowRequest,
    handleRejectFollowRequest,
  } = useFollow();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 NAYA STATE: Har specific button ki loading track karne ke liye
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await fetchPendingRequests();
        if (res?.requests) {
          setRequests(res.requests);
        }
      } catch (error) {
        console.error("Failed to load requests", error);
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []); // eslint-disable-line

  const onAccept = async (followerUsername) => {
    // 1. Loading shuru (Sirf is specific user ke liye)
    setActionLoading((prev) => ({ ...prev, [followerUsername]: "accepting" }));

    try {
      await handleAcceptFollowRequest(followerUsername);
      // 2. Success hui, toh usko list se hata do
      setRequests((prev) =>
        prev.filter((req) => req.follower !== followerUsername),
      );
    } catch (error) {
      // 3. Error aaya toh Alert dikhao (list se mat hatao)
      alert(
        error.response?.data?.message ||
          "Please select a photo first. An error occurred during post creation.",
      );
    } finally {
      // 4. Button wapas normal state mein
      setActionLoading((prev) => ({ ...prev, [followerUsername]: null }));
    }
  };

  const onReject = async (followerUsername) => {
    // 1. Loading shuru
    setActionLoading((prev) => ({ ...prev, [followerUsername]: "rejecting" }));

    try {
      await handleRejectFollowRequest(followerUsername);
      // 2. Success hui, toh list se hata do
      setRequests((prev) =>
        prev.filter((req) => req.follower !== followerUsername),
      );
    } catch (error) {
      // 3. Error aaya toh Alert dikhao
      alert(error.response?.data?.message || "Failed to reject request!");
    } finally {
      // 4. Button wapas normal state mein
      setActionLoading((prev) => ({ ...prev, [followerUsername]: null }));
    }
  };

  if (loading)
    return (
      <h3 style={{ color: "white", textAlign: "center" }}>
        Loading requests...
      </h3>
    );

  return (
    <div className="follow-requests-container">
      <h2 className="page-title">Follow Requests</h2>

      {requests.length === 0 ? (
        <p className="no-requests">No pending requests.</p>
      ) : (
        <div className="requests-list">
          {requests.map((req) => (
            <div key={req._id} className="request-item">
              {/* Left Side: User ki detail */}
              <div className="user-info">
                <div className="profile-img-wrapper">
                  <img
                    src={`https://ui-avatars.com/api/?name=${req.follower}&background=random`}
                    alt="profile"
                  />
                </div>
                <div className="user-text">
                  <p className="username">{req.follower}</p>
                  <p className="sub-text">wants to follow you</p>
                </div>
              </div>

              {/* Right Side: Tere dono buttons */}
              <div className="action-buttons">
                <button
                  className={`accept-btn ${actionLoading[req.follower] ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => onAccept(req.follower)}
                  disabled={!!actionLoading[req.follower]} // Agar koi bhi action chal raha hai toh disable kardo
                >
                  {actionLoading[req.follower] === "accepting"
                    ? "Accepting..."
                    : "Accept"}
                </button>

                <button
                  className={`reject-btn ${actionLoading[req.follower] ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => onReject(req.follower)}
                  disabled={!!actionLoading[req.follower]}
                >
                  {actionLoading[req.follower] === "rejecting"
                    ? "Rejecting..."
                    : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowRequestList;

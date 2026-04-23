import React, { useEffect, useState } from "react";
import { useFollow } from "../hooks/useFollow";

const FollowRequestList = () => {
  const {
    fetchPendingRequests,
    handleAcceptFollowRequest,
    handleRejectFollowRequest,
  } = useFollow();
  const [requests, setRequests] = useState([]);

  // Page load hote hi API call karo
  useEffect(() => {
    const loadRequests = async () => {
      const res = await fetchPendingRequests();
      if (res?.requests) {
        setRequests(res.requests);
      }
    };
    loadRequests();
  }, []);

  // Accept karne ka logic
  const onAccept = async (followerUsername) => {
    await handleAcceptFollowRequest(followerUsername);
    // UI se request hata do kyunki accept ho gayi
    setRequests(requests.filter((req) => req.follower !== followerUsername));
  };

  // Reject karne ka logic
  const onReject = async (followerUsername) => {
    await handleRejectFollowRequest(followerUsername);
    // UI se request hata do kyunki reject ho gayi
    setRequests(requests.filter((req) => req.follower !== followerUsername));
  };

  return (
    <div className="follow-requests-container">
      <h2>Follow Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="request-card"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <p>
              <strong>{req.follower}</strong> wants to follow you.
            </p>

            {/* ASLI JADOO YAHAN HAI */}
            <button
              onClick={() => onAccept(req.follower)}
              style={{
                backgroundColor: "#0095f6",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Accept
            </button>

            <button
              onClick={() => onReject(req.follower)}
              style={{
                backgroundColor: "#363636",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FollowRequestList;

import React from "react";

const Post = ({ post }) => {
  


  return (
    <div className="post">
      {/* top section */}
      <div className="username-section">
        <div className="profile-img-wrapper">
          <img src={post?.user?.profile_image} alt="profile" />
        </div>
        <p>{post?.user?.username || "Unknown User"}</p>
      </div>

      {/* middle section */}
      <div className="post-image">
        <img src={post?.imgFile} alt="post content" />
      </div>

      {/* bottom section */}
      <div className="caption-section">
        <div className="caption-icon">
          <div className="like-comment-share">
            <i className="ri-heart-3-line" style={{ cursor: "pointer" }}></i>
            <i className="ri-chat-3-line" style={{ cursor: "pointer" }}></i>
            <i
              className="ri-share-forward-line"
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <div className="save">
            <i className="ri-save-fill" style={{ cursor: "pointer" }}></i>
          </div>
        </div>

        {/* Like counter bhi add kar sakte ho ab yahan */}
        <p style={{ fontWeight: "bold", margin: "5px 0" }}>
          {post?.likeCounter || 0} likes
        </p>

        <p>
           {post?.caption}
        </p>
      </div>
    </div>
  );
};

export default Post;

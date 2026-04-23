import React from "react";
import { usePost } from "../hooks/usePost";
import FollowButton from "../../FollowUnfollow/components/FollowButton";
import { useAuth } from './../../auth/hooks/useAuth';

const Post = ({ post }) => {
  const { handleLike } = usePost();

  // Apne hook se current user nikal rahe hain
  const { user: currentUser } = useAuth();

  const onLikeClick = () => {
    handleLike(post._id);
  };

  // Condition: Kya ye post logged-in user ki hi hai?
  const isOwnPost = currentUser?.username === post.user?.username;

  return (
    <div className="post">
      <div className="username-section">
        <div className="profile-img-wrapper">
          <img src={post.user?.profile_image} alt="profile" />
        </div>

        <p>{post.user?.username || "Unknown User"}</p>

        {/* Agar khud ki post nahi hai, tabhi FollowButton dikhega */}
        {!isOwnPost && (
          <FollowButton
            username={post.user?.username}
            isPrivateAccount={post.user?.isPrivate}
            initialStatus={post.user?.followStatus || "none"}
          />
        )}
      </div>

      <div className="post-image">
        <img src={post.imgFile} alt="post content" />
      </div>

      <div className="caption-section">
        <div className="caption-icon">
          <div className="like-comment-share">
            <i
              className={post.isLiked ? "ri-heart-3-fill" : "ri-heart-3-line"}
              onClick={onLikeClick}
              style={{
                color: post.isLiked ? "#ed4956" : "white",
                cursor: "pointer",
              }}
            ></i>
            <i className="ri-chat-3-line"></i>
            <i className="ri-share-forward-line"></i>
          </div>

          <div className="save">
            <i className="ri-save-fill"></i>
          </div>
        </div>

        <p className="likes-count">{post.likeCounter} likes</p>

        <p className="caption-text">
          <span>{post.user?.username}</span>
          {post.caption}
        </p>
      </div>
    </div>
  );
};

export default Post;

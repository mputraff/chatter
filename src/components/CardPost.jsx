import React, { useState } from "react";
import CommentPost from "./CommentPost";
import { useUser } from "../UserContext";
import { usePosts } from "../PostsContext";


export default function CardPost({ post }) {
  const { user } = useUser();
  const { addPost, updatePost } = usePosts();
  const [showComment, setShowComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = async () => {
    try {
      const response = await fetch('https://api-chatter-tau.vercel.app/api/auth/like-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ post_id: post.id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to like post');
      }

      setIsLiked(data.liked);
      setLikeCount(data.likeCount);
      
      // Update post in context
      updatePost({ 
        ...post, 
        likes: data.likeCount,
        isLiked: data.liked 
      });
    } catch (error) {
      console.error("Error liking post:", error);
      alert(error.message || "An error occurred while liking the post");
    }
  }

  const handleShowComment = () => {
    setShowComment(!showComment);
  };


  const timeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)}d`;
    }
  };

  return (
    <div className="border-b border-gray-500 h-auto">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-1 px-4 pt-4">
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              {post.profile_picture ? (
                <img
                  src={post.profile_picture}
                  alt={post.user_name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="default-profile.png"
                  alt="Default Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col text-gray-400">
              <p className="text-white">{post.user_name || "Anonymous"}</p>
              <p className="text-sm">{post.user_id || "Unknown ID"}</p>
            </div>
          </div>
          <div className="text-gray-400">
            <p>{timeAgo(post.created_at) || "Just now"}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col text-justify text-white my-3 px-4">
        <p>{post.content || "No content available."}</p>
      </div>

      {/* Media */}
      {post.media_url && (
        <div className="w-full h-auto px-4">
          <img
            src={post.media_url}
            alt="Post Media"
            className="h-2/6 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex mt-2 gap-3 px-4 py-2">
        <button onClick={handleLike} className="flex items-center text-lg text-gray-600 gap-2 hover:text-white">
          <i className="fa-solid fa-heart text-xl"></i>
          <p className="text-xl">{post.likes || 0}</p>
        </button>
        <button
          onClick={handleShowComment}
          className="flex items-center text-lg text-gray-600 gap-2 hover:text-white"
        >
          <i className="fa-regular fa-comment text-xl"></i>
          <p className="text-xl">{post.comments?.length || 0}</p>
        </button>
      </div>

      {/* Comments */}
      {showComment && <CommentPost postId={post.id} />}
    </div>
  );
}

// CardPost.tsx
import CommentPost from "./CommentPost";
import { useState } from "react";
import { useUser } from "../UserContext";

export default function CardPost({ post }) {
  const { user } = useUser();
  const [showComment, setShowComment] = useState(false);

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="border-b border-gray-500 h-auto">
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-1 px-4 pt-4">
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              {post.user && post.user.profile_picture ? (
                <img
                  src={post.user.profile_picture}
                  alt={post.user.name}
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
              {post.user ? (
                <>
                  <p className="text-white">{post.user.name}</p>
                  <p className="text-sm">{post.user.id}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className="text-gray-400">
            <p>{timeAgo(post.timestamp)}</p>
          </div>
        </div>
        <div className="flex text-justify text-white my-3 px-4">
          <p>{post.content}</p>
        </div>
        {post.image && (
          <div className="w-full h-auto px-4">
            <img
              src={post.image}
              alt="Post"
              className="h-2/6 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            />
          </div>
        )}

        <div className="flex mt-2 gap-3 px-4 py-2">
          <button className="flex items-center text-lg text-gray-600 gap-2">
            <i className="fa-solid fa-heart text-xl "></i>
            <p className="text-xl">{}</p>
          </button>

          <button onClick={handleShowComment} className="flex items-center text-lg text-gray-600 gap-2 hover:text-white">
            <i className=" fa-regular fa-comment text-xl"></i>
            <p className="text-xl"></p>
          </button>

    
        </div>

        {showComment && <CommentPost postId={post.id} />} {/* Pass postId to CommentPost */}
      </div>
    </div>
  );
}

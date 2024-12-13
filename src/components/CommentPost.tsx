import { useState, useEffect } from "react";
import { useComments } from "../CommentsContext"; // Import CommentsContext
import { useUser } from '../UserContext'; 
import axios from "axios";

export default function CommentPost({ postId }) { // Ensure postId is passed as a prop
  const { comments, addComment } = useComments(); // Get comments and addComment from contex
  const { user } = useUser(); 
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://api-chatter-tau.vercel.app/api/auth/users");
        if (response.data && response.data.users.length > 0) {
          setUser(response.data.users[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCommentSubmit = () => {
    if (commentContent.trim()) {
      const newComment = {
        content: commentContent,
        user: user,
        timestamp: new Date().toISOString(),
      };
      addComment(postId, newComment); // Add comment to the context
      setCommentContent(""); // Clear the input
    }
  };

  return (
    <>
      <div className="h-auto border-t mt-2 border-gray-600 flex flex-col">
        {/* Comment Input */}
        <div className="flex items-center mb-2 pt-4 px-8 gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            {user ? (
              <img
                src={user.profile_picture} // Use the correct URL for the profile picture
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="default-profile.png" // Default image if no user
                alt="Default Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 py-2 px-3 bg-gray-800 text-white rounded-lg outline-none"
            onChange={(e) => setCommentContent(e.target.value)} // Update comment content on change
            value={commentContent} // Bind input value to state
          />
          <button
            className="ml-2 bg-teal-700 text-white p-2 px-4 rounded-lg hover:bg-teal-800"
            onClick={handleCommentSubmit} // Handle comment submission
          >
            Post
          </button>
        </div>

        {/* Comment Display */}
        {comments[postId] && comments[postId].map((comment, index) => (
          <div key={index} className="flex justify-between items-center my-1 px-8 pt-4">
            <div className="flex gap-2">
              {/* Profile Picture */}
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                {comment.user ? (
                  <img
                    src={comment.user.profile_picture} // Use the correct URL for the comment user's profile picture
                    alt={comment.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="default-profile.png" // Default image if no user
                    alt="Default Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col text-gray-400 text-sm">
                {comment.user ? (
                  <>
                    <p className="text-white text-base">{comment.user.name}</p>
                    <p className="text-sm">{comment.user.id}</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              <p>{new Date(comment.timestamp).toLocaleTimeString()}</p> {/* Display comment timestamp */}
            </div>
          </div>
        ))}
        {comments[postId] && comments[postId].map((comment, index) => (
          <div key={index} className="flex text-justify text-gray-400 mt-1 mb-3 px-20 text-sm">
            <p className="text-white">{comment.content}</p> {/* Display comment content */}
          </div>
        ))}
      </div>
    </>
  );
}

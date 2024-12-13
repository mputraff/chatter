import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useUser } from '../UserContext'; 
import { usePosts } from '../PostsContext';

export default function NewPost() {
  const { user } = useUser(); 
  const { addPost } = usePosts(); // Get addPost from context
  const [fileImage, setFileImage] = useState(); 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const [postContent, setPostContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(URL.createObjectURL(file));
    }
  };

  

  const handlePost = () => {
    const newPost = {
      content: postContent,
      image: fileImage,
      user: user,
      timestamp: new Date().toISOString(),
    };
    addPost(newPost); // Add the new post to the context
    setPostContent(""); // Clear the textarea
    setFileImage(null); // Clear the image
  };

  return (
    <div className="flex flex-col p-4 gap-8 h-screen">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {/* Gambar profil */}
          <div className="w-12 h-12 rounded-lg">
            {user && user.profile_picture ? (
              <img src={user.profile_picture} alt={user.name} className="rounded-lg" />
            ) : (
              <img src="default-profile.png" alt="Default Profile" className="rounded-lg" />
            )}
          </div>
          {/* Nama dan ID */}
          <div className="flex flex-col text-gray-400">
            {user ? (
              <>
                <p className="text-white">{user.name || "Guest"}</p>
                <p className="text-sm">{user.id || "ID not available"}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="text-gray-400">
          <button>
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>

      {/* Konten postingan */}
      <div className="flex flex-col text-white h-auto overflow-auto scrollbar-hide bg-gray-900 rounded-lg">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="w-full bg-transparent outline-none p-3 resize-none scrollbar-hide overflow-y-auto"
          placeholder="What's on your mind?"
        ></textarea>
        {/* Gambar yang diupload */}
        {fileImage && (
          <div className="w-full h-auto p-3 mt-8">
            <img src={fileImage} alt="Uploaded" className="rounded-md h-36 w-full object-cover" />
          </div>
        )}
        <div className="flex px-4 py-2 justify-between xl:pt-6">
          <div className="flex text-gray-400 gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="upload-image"
              className="hidden"
            />
            <label htmlFor="upload-image">
              <i className="fa-solid fa-image cursor-pointer"></i>
            </label>

            
          </div>
          <button className="bg-teal-700 rounded-md px-10" onClick={handlePost}>Post</button>
        </div>
        {showEmojiPicker && (
          <div className="absolute z-10 mt-20">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

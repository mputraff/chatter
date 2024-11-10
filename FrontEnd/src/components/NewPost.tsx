import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function NewPost() {
  const [fileImage, setFileImage] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Untuk menampilkan emoji picker
  const [postContent, setPostContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(URL.createObjectURL(file)); // Set file image
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    setPostContent((prevContent) => prevContent + emojiObject.emoji); // Menambahkan emoji ke konten
  };

  return (
    <>
      <div className="flex flex-col p-4 gap-8 h-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-white rounded-lg "></div>
            <div className="flex flex-col text-gray-400">
              <p>Name</p>
              <p className="">id</p>
            </div>
          </div>
          <div className="text-gray-400">
            <button>
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-col text-white h-auto xl:h-48 bg-gray-900 rounded-lg">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            name=""
            id=""
            className="w-full bg-transparent outline-none p-3 resize-none h-32 overflow-hidden "
            placeholder="What's on your mind?"
          ></textarea>
          {/* image */}
          {fileImage && (
            <div className="w-full h-auto p-3">
              <img src={fileImage} alt="Uploaded" className="rounded-md" />
            </div>
          )}
          <div className="flex px-4 py-2 justify-between xl:pt-6  ">
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

              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <i className="fa-solid fa-face-smile"></i>
              </button>
            </div>
            <button className="bg-teal-700 rounded-md px-10">Post</button>
          </div>
          {showEmojiPicker && (
            <div className="absolute z-10 mt-20">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

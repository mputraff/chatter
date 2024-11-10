import Sidebar from "./Sidebar";
import News from "../pages/News";
import NewPost from "./NewPost";
import SearchBar from "./Search";
import Post from "../pages/Post";
import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
export default function ExplorePost() {
  // buatlah ketika user klik post akan langsung diarahkan ke post
  const [showPost, setShowPost] = useState(false);
  const [showNews, setShowNews] = useState(true);
  const [showNewsPost, setShowNewsPost] = useState(false);

  const handleShowPost = () => {
    setShowPost(true);
    setShowNews(false);
    setShowNewsPost(false);
  };

  const handleShowNews = () => {
    setShowPost(false);
    setShowNews(true);
    setShowNewsPost(false);
  };

  const handleShowNewsPost = () => {
    setShowPost(false);
    setShowNews(false);
    setShowNewsPost(true); // Only show NewPost
  };

  return (
    <>
      <Navbar onClick={handleShowNewsPost} />
      <section className="h-screen flex gap-2 max-lg:gap-0 justify-center ">
        <div className="flex flex-col max-md:hidden w-1/5 max-md:w-full max-lg:w-6/12 xl:mt-3">
          <div className="py-3 px-4 text-white flex bg-gray-900 rounded-lg">
            <div className="flex w-full items-center border-gray-600 border py-2 px-3 rounded-lg">
              <input
                type="text"
                placeholder="Search"
                className="outline-none bg-transparent w-full"
              />
              <i className="fa-solid fa-magnifying-glass ml-2 text-gray-400"></i>
            </div>
          </div>
         {/* <NewPost /> */}
        </div>

        {/* Container kiri untuk konten utama */}
        <div className="flex flex-col w-5/12 xl:border xl:border-gray-500 max-lg:border-x max-md:border-r max-md:border-l-0 max-lg:w-full max-lg:border-gray-500 xl:rounded-md xl:mt-3 ">
          {/* Header Explore */}
          <div className="py-3 px-4 text-white flex border-b border-gray-500">
            <button className="text-lg">
              <i className="fa-solid fa-earth-europe mr-2"></i> Explore
            </button>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Navigation Buttons */}
          <div className="py-3 justify-between flex px-10 text-gray-400 border-b border-gray-500">
            <button
              onClick={handleShowPost}
              className="hover:text-white transition duration-300"
            >
              Posts
            </button>
            <button className="hover:text-white transition duration-300">
              People
            </button>
            <button
              onClick={handleShowNews}
              className="hover:text-white transition duration-300"
            >
              News
            </button>
          </div>

          {/* News Section with overflow */}
          <div className="flex-1 overflow-auto scrollbar-hide">
            {showPost && <Post />}
            {showNews && <News />}
            {showNewsPost && <NewPost />}
          </div>
        </div>

        {/* Sidebar */}
        <div className="max-md:block max-md:h-full max-lg:w-16 w-1/6">
          <Sidebar />
        </div>
      </section>
    </>
  );
}

import React, { createContext, useState, useContext, useEffect,  ReactNode } from 'react';
import axios from 'axios'; // Pastikan Anda menginstal axios

// Definisikan tipe untuk post
interface Post {
  id: string;
  content: string;
  // Tambahkan properti lain sesuai kebutuhan
}

interface PostsContextType {
  posts: Post[];
  addPost: (newPost: Post) => void;
  fetchPosts: () => void; // Tambahkan fungsi untuk mengambil postingan
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://api-chatter-tau.vercel.app/api/auth/posts'); // Ganti dengan URL endpoint Anda
      setPosts(response.data.data); // Sesuaikan dengan struktur respons Anda
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    fetchPosts(); // Ambil postingan saat komponen dimuat
  }, []);

  return (
    <PostsContext.Provider value={{ posts, addPost, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

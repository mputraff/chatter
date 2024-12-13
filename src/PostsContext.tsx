import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definisikan tipe untuk post
interface Post {
  id: string; // Misalnya, ID post
  content: string; // Konten post
  // Tambahkan properti lain sesuai kebutuhan
}

// Definisikan tipe untuk konteks post
interface PostsContextType {
  posts: Post[]; // Array of posts
  addPost: (newPost: Post) => void; // Fungsi untuk menambah post
}

// Buat konteks dengan nilai default undefined
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Komponen provider untuk posts
export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]); // State untuk menyimpan posts

  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]); // Menambah post baru
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};

// Hook untuk menggunakan PostsContext
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

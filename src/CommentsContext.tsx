// CommentsContext.tsx
import React, { createContext, useState, useContext } from 'react';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({}); // Store comments by post ID

  const addComment = (postId, newComment) => {
    setComments((prevComments) => {
      const postComments = prevComments[postId] || [];
      return { ...prevComments, [postId]: [...postComments, newComment] };
    });
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);
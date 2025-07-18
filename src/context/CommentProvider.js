import React, { useState, useEffect, useCallback } from "react";
import { CommentContext } from "./CommentContext";
import CommentController from "../controller/CommentController";

export default function CommentProvider({ children }) {
  const [commentsMap, setCommentsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [commentsByBlogId, setCommentsByBlogId] = useState({});

  const fetchCommentsByBlog = useCallback(async (blogId) => {
    try {
      const data = await CommentController.getCommentsByBlogId(blogId);
      setCommentsMap((prev) => ({ ...prev, [blogId]: data.comments || [] }));
     
    } catch (error) {
      console.error(`Failed to fetch comments for blog ${blogId}:`, error);
    }
  }, []);

  const loadCommentsForBlogs = useCallback(async (blogs) => {
    try {
      const all = {};
      for (let blog of blogs) {
        const res = await CommentController.getCommentsByBlogId(blog._id);
        all[blog._id] = res.comments || [];
      }
      setCommentsByBlogId(all);
    } catch (err) {
      console.error("Failed loading comments:", err);
    }
  }, []);

  const addComment = async (blogId, commentData) => {
  try {
    const response = await CommentController.addComment(blogId, commentData);

    if (response.comment) {
      const newComment = response.comment; // backend format
      setCommentsByBlogId((prev) => ({
        ...prev,
        [blogId]: [...(prev[blogId] || []), newComment],
      }));
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Failed to add comment:", error);
  }
};


  const deleteComment = async (commentId, blogId) => {
  try {
    await CommentController.deleteComment(commentId);

    // Remove deleted comment from state
    setCommentsByBlogId((prev) => ({
      ...prev,
      [blogId]: (prev[blogId] || []).filter((c) => c._id !== commentId),
    }));
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
};


  return (
    <CommentContext.Provider
      value={{
        commentsMap,
        loading,
        fetchCommentsByBlog,
        loadCommentsForBlogs,
        addComment,
        deleteComment,
        commentsByBlogId,
        setCommentsByBlogId,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

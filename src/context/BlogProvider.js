import BlogController from "../controller/BlogController";
import { useState, useEffect, useContext, useCallback } from "react";
import { BlogContext } from "./BlogContext";
import { CommentContext } from "./CommentContext";

export default function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use context only inside the effect to avoid issues during initialization
  const commentContext = useContext(CommentContext);
  const loadCommentsForBlogs = commentContext?.loadCommentsForBlogs;

  const createBlog = async (blogData) => {
    try {
      const newBlog = await BlogController.createBlog(blogData);
      console.log("New blog created:", newBlog.blog);
      // ✅ Add to state
      setBlogs((prev) => [newBlog.blog, ...prev]);
      return newBlog.blog; // Return the full blog object
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  const editBlog = async (id, updatedData) => {
    console.log("Submitted data for update:", updatedData);
    try {
      const res = await BlogController.editBlog(id, updatedData);
      const updatedBlog = res.blog;

      console.log("Updated blog returned from server:", updatedBlog);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
    } catch (error) {
      console.error("Failed to edit blog:", error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await BlogController.deleteBlog(blogId);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      console.log("Blog deleted successfully.");
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await BlogController.getBlogs();
        setBlogs(data.blogs);

        if (
          data.blogs?.length > 0 &&
          typeof loadCommentsForBlogs === "function"
        ) {
          await loadCommentsForBlogs(data.blogs);
          console.log("Comments loaded for blogs:", data.blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [loadCommentsForBlogs]); // Now safe since it's memoized

  return (
    <BlogContext.Provider
      value={{ blogs, loading, createBlog, editBlog, deleteBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
}

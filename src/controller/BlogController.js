const API = "http://localhost:4000/blogs";

export default class BlogController {
  static async getBlogs() {
    try {
      const response = await fetch(`${API}/all`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
    }
    const response = await fetch(API);
    const data = await response.json();
    return data;
  }

  static async getBlogById(id) {
    try {
      const response = await fetch(`${API}/view/${id}`);
      const data = await response.json();


      return data.blog;
    } catch (error) {
      console.error(error);
    }
  }

  // controller/BlogController.js
static async createBlog(blogData) {
  const res = await fetch(`${API}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(blogData),
  });

  console.log("response", res);

  // ✅ Ensure this returns the full blog object
  if (!res.ok) throw new Error("Failed to create blog");

  return await res.json(); // Must return the blog with _id, createdAt, etc.
}

static async editBlog(id, blog) {
 console.log("top is editBlog");
  console.log("Editing blog with ID:", id);
  console.log("Updated blog data:", blog);
   console.log("top is editBlog");
  try {
    const response = await fetch(`${API}/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // fixed typo here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(blog), // include body with updated blog data
    });

    console.log(response);
    console.log("top is response");

    if (!response.ok) {
      throw new Error("Failed to update blog");
    }

    return await response.json(); // return parsed JSON
  } catch (error) {
    console.error("Error in editBlog:", error);
    throw error;
  }
}

  static async deleteBlog(id) {
    try {
      const response = await fetch(`${API}/remove/${id}`, {

        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        return true;
      } else {
        return console.log("Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

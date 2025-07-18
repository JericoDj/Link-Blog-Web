const API = "https://link-api-r0b6.onrender.com/blogs";

export default class CommentController {
  static async getCommentsByBlogId(blogId) {
    const response = await fetch(`${API}/comments/${blogId}`);
    return await response.json();
  }

  static async addComment(blogId, comment) {
    const response = await fetch(`${API}/comments/${blogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(comment),
    });
    return await response.json();
  }

  static async updateComment(commentId, updatedContent) {
    const response = await fetch(`${API}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ content: updatedContent }),
    });
    return await response.json();
  }

  static async deleteComment(commentId) {
  const response = await fetch(`${API}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }

  return await response.json(); // optional: depends on backend response
}
}
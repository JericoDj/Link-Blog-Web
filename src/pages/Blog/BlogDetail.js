import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import { CommentContext } from "../../context/CommentContext";
import { BlogContext } from "../../context/BlogContext";
import { UserContext } from "../../context/UserContext";
import BlogController from "../../controller/BlogController";
import CommentController from "../../controller/CommentController";
import UserController from "../../controller/UserController";
import LoginModal from "../../components/LoginModal/LoginModal";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [editPostMode, setEditPostMode] = useState(false);
  const [editPostForm, setEditPostForm] = useState({ title: "", content: "" });
  const [updatingBlog, setUpdatingBlog] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const { user } = useContext(UserContext);
  const { editBlog } = useContext(BlogContext);
  const {
    commentsByBlogId,
    fetchCommentsByBlog,
    addComment,
    setCommentsByBlogId,
    deleteComment,
  } = useContext(CommentContext);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchPost() {
      
      try {
        const blogData = await BlogController.getBlogById(id);
        setPost(blogData);
        await fetchCommentsByBlog(id);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, fetchCommentsByBlog]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!token) return setShowLogin(true);

    try {
      await addComment(id, { content: newComment }, token);
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.content);
  };

  const handleEditCommentSubmit = async () => {
    try {
      await CommentController.updateComment(editingCommentId, editText);

      const updated = commentsByBlogId[id].map((c) =>
        c._id === editingCommentId ? { ...c, content: editText } : c
      );

      setCommentsByBlogId((prev) => ({ ...prev, [id]: updated }));
      setEditingCommentId(null);
      setEditText("");
    } catch (err) {
      console.error("Edit comment failed:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

const handleEditBlog = () => {
  if (!user) return setShowLogin(true);

  const fullName = `${user.firstName} ${user.lastName}`;
  if (user.isAdmin || post.author === fullName) {
    setEditPostForm({ title: post.title, content: post.content });
    setEditPostMode(true);
  } else {
    setShowAuthAlert(true);
  }
};

  const handleUpdateBlog = async () => {
  setUpdatingBlog(true);
  try {
    await editBlog(id, editPostForm);
    setPost((prev) => ({ ...prev, ...editPostForm }));
    setEditPostMode(false);
  } catch (err) {
    console.error("Blog update failed:", err);
  } finally {
    setUpdatingBlog(false);
  }
};

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!post) {
    return <div className="text-center py-5 text-muted">Post not found.</div>;
  }

  const comments = commentsByBlogId?.[id] || [];
  const imageSrc = `https://picsum.photos/800/400?random=${post._id}`;
  const currentUserId = currentUser?._id;

  return (
    <Container className="blog-detail-page py-5">
      <Card className="mb-4 shadow-sm">
        <Card.Img variant="top" src={imageSrc} alt={post.title} />
        <Card.Body>
          <div className="blog-meta text-muted mb-2 small">
            {new Date(post.createdAt).toLocaleDateString()} • {post.author}
          </div>
          <h2 className="fw-bold mb-3">{post.title}</h2>
          <p className="text-muted">{post.content}</p>

          <Button variant="outline-primary" onClick={handleEditBlog}>
            ✏️ Edit Blog
          </Button>
        </Card.Body>
      </Card>

      {editPostMode && (
        <Card className="p-4 mb-4">
          <h5>Edit Blog</h5>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={editPostForm.title}
                onChange={(e) =>
                  setEditPostForm((p) => ({ ...p, title: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={editPostForm.content}
                onChange={(e) =>
                  setEditPostForm((p) => ({ ...p, content: e.target.value }))
                }
              />
            </Form.Group>
            <div className="mt-3">
              <Button onClick={handleUpdateBlog} disabled={updatingBlog}>
                {updatingBlog ? "Saving..." : "Save Changes"}
              </Button>{" "}
              <Button variant="secondary" onClick={() => setEditPostMode(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card>
      )}

      <Card className="p-4 shadow-sm">
        <h5 className="mb-4">💬 Comments</h5>
        <Form onSubmit={handleCommentSubmit} className="mb-4">
          <Form.Group controlId="newComment">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Submit Comment
          </Button>
        </Form>

        {comments.length ? (
          comments.map((c) => {
            const isOwner = c.userId === currentUserId;
            return (
              <div key={c._id} className="mb-3 border-bottom pb-2">
                <div className="d-flex justify-content-between">
                  <div className="w-100">
                    <strong>{c.userFullName}</strong>
                    <div className="text-muted small">
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                    {editingCommentId === c._id ? (
                      <>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="mt-2 d-flex gap-2">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={handleEditCommentSubmit}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingCommentId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p className="mb-1">{c.content}</p>
                    )}
                  </div>
                  {isOwner && editingCommentId !== c._id && (
                    <div className="ms-3 d-flex flex-column gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => handleEditComment(c)}
                      >
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDeleteComment(c._id)}
                      >
                        🗑️
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-muted">No comments yet.</div>
        )}
      </Card>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />

      <Modal show={showAuthAlert} onHide={() => setShowAuthAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Access Denied</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are not the owner or an admin of this blog post.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAuthAlert(false)}>
            Close
          </Button>


        </Modal.Footer>
      </Modal>
    </Container>
  );
}

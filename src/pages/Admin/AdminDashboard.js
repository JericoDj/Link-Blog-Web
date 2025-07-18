import React, { useState, useContext } from "react";
import { Button, Card, Modal, Spinner } from "react-bootstrap";
import { BlogContext } from "../../context/BlogContext";
import { useNavigate } from "react-router-dom";

import { CommentContext } from "../../context/CommentContext";

import AddBlogModal from "../../components/AdminBlogModal/AddBlogModal/AddBlog.js";

import EditBlogModal from "../../components/AdminBlogModal/EditBlogModal/EditBlogModal.js";
import DeleteBlogModal from "../../components/AdminBlogModal/DeleteBlogModal/DeleteBlogModal.js";
import "./AdminDashboard.css";

export default function AdminDashboard() {
const { blogs, deleteBlog, editBlog, loading } = useContext(BlogContext);
  const navigate = useNavigate();

  const { commentsByBlogId } = useContext(CommentContext);


  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpen = (modalType, blog) => {
    setSelectedBlog(blog);

    if (modalType === "edit") setShowEditModal(true);
    if (modalType === "delete") setShowDeleteModal(true);
  };

  return (
    <div className="admin-dashboard container py-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          + Add New Blog Post
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((b, index) => (
              <div className="col-md-4 mb-4" key={b._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`https://picsum.photos/300/200?random=${index}`}
                    alt="Blog cover"
                  />
                  <Card.Body>
                    <Card.Title>{b.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(b.createdAt).toLocaleDateString()} by {b.author}
                    </Card.Subtitle>
                    <Card.Text>
                      {b?.content?.length > 100
                        ? b.content.substring(0, 100) + "..."
                        : b.content || "No content"}
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => navigate(`/blogDetail/${b._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => handleOpen("edit", b)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleOpen("delete", b)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Comments ({commentsByBlogId[b._id]?.length || 0})
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">
              No blog data available.
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <AddBlogModal show={showAddModal} onHide={() => setShowAddModal(false)} />
      {/* <ViewBlogModal
        show={showViewModal}
        handleClose={() => setShowViewModal(false)}
        blog={selectedBlog}
      /> */}
      <EditBlogModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        blog={selectedBlog}
        onSubmit={async (updatedBlog) => {
          console.log("Updated Blog:", updatedBlog);
          await editBlog(selectedBlog._id, updatedBlog);
          setShowEditModal(false); // Close after successful edit
        }}
      />
      <DeleteBlogModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        blog={selectedBlog}
      
        onDelete={async (blogId) => {
          console.log("Deleting blog with ID:", blogId);
          await deleteBlog(blogId);
          setShowDeleteModal(false); // Close after successful delete
        }}
      />
    </div>
  );
}

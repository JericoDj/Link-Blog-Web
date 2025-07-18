import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteBlogModal({ show, onHide, onDelete, blog }) {
  if (!blog) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Blog Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the blog post titled:</p>
        <strong>{blog.title}</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onDelete(blog._id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

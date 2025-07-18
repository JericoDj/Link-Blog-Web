// src/components/Modals/ViewBlogModal.js
import React from "react";
import { Modal, Button, Image, Form } from "react-bootstrap";
import "./ViewBlog.css";

export default function ViewBlogModal({ show, handleClose, blog }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{blog?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="view-blog-body">
        <Image
          src={`https://picsum.photos/800/400?random=${blog?._id}`}
          fluid
          className="mb-3 rounded"
        />
        <p className="text-muted">
          By <strong>{blog?.author}</strong> on{" "}
          {new Date(blog?.createdAt).toLocaleDateString()}
        </p>
        <hr />
        <div className="blog-content mb-4" style={{ whiteSpace: "pre-wrap" }}>
          {blog?.content}
        </div>
        <hr />
        <h5 className="mt-4">Comments</h5>
        <div className="comment-box mb-3">
          <p><strong>Juan Dela Cruz</strong>: Very informative!</p>
          <p><strong>Ana Reyes</strong>: Thanks for sharing.</p>
          <p><strong>Karl Lim</strong>: This helped a lot.</p>
        </div>
        <Form>
          <Form.Group controlId="commentInput" className="mb-3">
            <Form.Label>Add a comment</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Write something..." />
          </Form.Group>
          <Button variant="primary">Submit Comment</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

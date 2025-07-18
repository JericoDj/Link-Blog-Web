import React, { useState, useContext } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { BlogContext } from "../../../context/BlogContext";

export default function AddBlogModal({ show, onHide }) {
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const { createBlog } = useContext(BlogContext);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!blog.title.trim() || !blog.content.trim()) return;

    setSubmitting(true);
    try {
      await createBlog(blog); // this already pushes to blogs in context
      
      setBlog({ title: "", content: "" }); // optional: reset the form
      onHide(); // close modal
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Blog Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={blog.title}
              onChange={handleChange}
              disabled={submitting}
            />
          </Form.Group>
          <Form.Group controlId="formContent" className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              rows={5}
              placeholder="Enter blog content"
              value={blog.content}
              onChange={handleChange}
              disabled={submitting}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting || !blog.title.trim() || !blog.content.trim()}
          >
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

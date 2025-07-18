import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EditBlogModal({ show, onHide, blog, onSubmit }) {
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (show && blog) {
      setFormData({ title: blog.title, content: blog.content });
    }
    if (!show) {
      setFormData({ title: "", content: "" });
    }
  }, [show, blog]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  if (!formData.title || !formData.content) {
    alert("Both fields are required.");
    return;
  }
 
  await onSubmit(formData);
  onHide();

};

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editFormTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Update blog title"
            />
          </Form.Group>

          <Form.Group controlId="editFormContent" className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              placeholder="Update blog content"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
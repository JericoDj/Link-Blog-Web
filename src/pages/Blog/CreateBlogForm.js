import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { BlogContext } from "../../context/BlogContext";
import LoginModal from "../../components/LoginModal/LoginModal";


export default function CreateBlogForm() {
  const { createBlog } = useContext(BlogContext);
  const [form, setForm] = useState({ title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.title.trim() || !form.content.trim()) {
    setError("Please fill out both title and content.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    setShowLoginModal(true);
    return;
  }

  try {
   
    setSubmitting(true);
    setError("");
    const user = JSON.parse(localStorage.getItem("user"));
    const author = user ? `${user.firstName} ${user.lastName}` : "Anonymous";
    const finalForm = { ...form, author };
    const result = await createBlog(finalForm);
    console.log("Blog created successfully:", result);
    
    setForm({
      title: "",
      content: "",
      author: author,
    });
  } catch (err) {
    console.error("Error while publishing blog:", err);
    setError("Failed to publish blog.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <section className="py-4 bg-white border-bottom">
      <Container>
        <h4>Create a Blog Post</h4>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                />
              </Form.Group>
            </Col>
          </Row>
          
         
          <Button type="submit" variant="success" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish Blog"}
          </Button>
        </Form>
      </Container>
      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} /> 
    </section>

    
  );
}
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ForgotPassword.css';

export default function ForgotPasswordModal({ show, handleClose, setShowLogin }) {
  const [email, setEmail] = useState('');
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 TODO: Send password reset email (e.g. Firebase)
    console.log("Reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="forgot-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Reset Your Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!submitted ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formForgotEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Send Reset Link
            </Button>

            <div className="text-center">
              <span>Already have an account? </span>
              <a
                href="#"
                className="login-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogin(true); // close forgot password modal
                }}
              >
                Login
              </a>
            </div>
          </Form>
        ) : (
          <div className="text-center">
            <p>
              ✅ If your email is registered, a reset link has been sent.
            </p>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

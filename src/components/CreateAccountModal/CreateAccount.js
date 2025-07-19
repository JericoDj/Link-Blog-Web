 import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CreateAccountModal.css';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountModal({ show, handleClose, setShowLogin }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
  });
    const { login, register } = useContext(UserContext);
    const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Creating account:', form);

  try {
    // Register user
    await register(form);

    // Immediately login user
    const { user } = await login(form.email, form.password);

    console.log('Account created & logged in:', user);

    handleClose(); // Close modal
    navigate('/blog'); // Or redirect elsewhere
  } catch (error) {
    console.error('Error during registration/login:', error.message);
    alert('Failed to create account. Please try again.');
  }
};

  return (
    <Modal show={show} onHide={handleClose} centered className="create-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Create Your Account</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              placeholder="John"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="0912 345 6789"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Create Account
          </Button>

          <div className="text-center">
            <span>Already have an account? </span>
            <a
              href="#"
              className="login-link"
              onClick={(e) => {
                e.preventDefault();
                handleClose();     // close create account modal
                setShowLogin(true); // open login modal
              }}
            >
              Login
            </a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

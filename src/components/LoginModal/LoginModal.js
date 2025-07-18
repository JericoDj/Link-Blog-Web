import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import UserController from "../../controller/UserController";
import { UserContext } from "../../context/UserContext";


export default function LoginModal({ show, handleClose, setShowForgot, setShowCreate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser, login } = useContext(UserContext);
  

  useEffect(() => {
    if (user) {
      console.log("User is now set:", user);
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      const token = await UserController.GoogleLogin();
      console.log("Google login successful, token:", token);

      localStorage.setItem("token", token);

      const userData = await UserController.getUserDetails(token);

      // Optional: Exclude password if it exists
      delete userData.password;

      setUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData));

      navigate(userData.isAdmin ? "/admin" : "/blog");
      handleClose();
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    }
  };

  
const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email.");
    return;
  }

  try {
    const { user } = await login(email, password); // ← use context login

    // Navigate after user is set
    if (user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/blog");
    }

    handleClose();
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
  }
};

  return (
    <Modal show={show} onHide={handleClose} centered className="login-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Sign in to Link</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* <a
              href="#"
              className="forgot-link"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                setShowForgot(true);
              }}
            >
              Forgot password?
            </a> */}
          </div>

          <Button variant="primary" className="w-100 mb-3" onClick={handleLogin}>
            Sign In
          </Button>

          {/* <Button variant="outline-dark" className="w-100 mb-3" onClick={handleGoogleLogin}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Continue with Google
          </Button> */}

          <div className="text-center">
            <span>Don't have an account? </span>
            <a
              href="#"
              className="create-link"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                setShowCreate(true);
              }}
            >
              Create Account
            </a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

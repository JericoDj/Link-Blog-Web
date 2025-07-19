import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import LoginModal from "./LoginModal/LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal/ForgotPassword";
import CreateAccountModal from "./CreateAccountModal/CreateAccount";
import "./AppNavBar.css";
import AccountModal from "./AccountModal.js";

export default function AppNavBar() {
  const { user } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="app-navbar py-3" sticky="top">
        <Container>
          {/* Left: Brand Logo */}
          <Navbar.Brand href="/" className="brand-logo">
            Link
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            {/* Center: Navigation Links */}
            <Nav className="mx-auto nav-links text-center">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            {/* Right: Support Us + Account/Login */}
            <div className="d-flex gap-2 ms-auto">
              <div className="coffee-buttons d-flex justify-content-center gap-3">
                <a
                  href="https://coff.ee/mjericodj" // Replace with your actual link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-coffee"
                >
                  Buy us a coffee
                </a>

                {/* Optional second button */}
                {/* <a
          href="https://gcashlink.com/yourqr" // Replace with GCash or Ko-fi if needed
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-light"
        >
          📱 GCash Support
        </a> */}
              </div>

 {(() => {
  const token = localStorage.getItem("token");

  if (token) {
    // Token exists, assume user will be set soon — show "Account"
    return (
      <Button
        variant="outline-dark"
        className="account-btn"
        onClick={() => setShowAccount(true)}
      >
        Account
      </Button>
    );
  }

  if (user !== undefined && !user) {
    // No token and user resolved as null — show "Login"
    return (
      <Button
        variant="outline-primary"
        className="account-btn"
        onClick={() => setShowLogin(true)}
      >
        Login
      </Button>
    );
  }

  // While loading or user is still undefined/null with token, show nothing
  return null;
})()}


            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AccountModal
        show={showAccount}
        handleClose={() => setShowAccount(false)}
      />

      {/* Login Modal */}
      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        setShowForgot={setShowForgot}
        setShowCreate={setShowCreate}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        show={showForgot}
        handleClose={() => setShowForgot(false)}
        setShowLogin={setShowLogin}
      />

      {/* Create Account Modal */}
      <CreateAccountModal
        show={showCreate}
        handleClose={() => setShowCreate(false)}
        setShowLogin={setShowLogin}
      />
    </>
  );
}

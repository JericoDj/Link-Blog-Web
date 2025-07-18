import React, { useContext } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function AccountModal({ show, handleClose }) {
  const { user, unsetUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    unsetUser();
    handleClose();
    navigate("/");
  };

  if (!user) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Account Info</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
          <ListGroup.Item><strong>Name:</strong> {user.firstName} {user.lastName}</ListGroup.Item>
          <ListGroup.Item><strong>Mobile:</strong> {user.mobileNo}</ListGroup.Item>
          <ListGroup.Item><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Modal.Footer>
    </Modal>
  );
}

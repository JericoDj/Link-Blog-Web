// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-4">
          {/* Brand & Tagline */}
          <Col md={4}>
            <h4 className="footer-logo">Link</h4>
            <p className="footer-tagline">Where stories connect.</p>
            <p className="footer-copy">© {new Date().getFullYear()} Link. All rights reserved.</p>
          </Col>

          {/* Quick Links */}
          <Col md={2}>
            <h6 className="footer-heading">Explore</h6>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </Col>

          {/* Resources */}
          <Col md={3}>
            <h6 className="footer-heading">Resources</h6>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/sitemap">Sitemap</a></li>
            </ul>
          </Col>

          {/* Connect */}
          <Col md={3}>
            <h6 className="footer-heading">Connect</h6>
            <ul className="footer-links">
              <li><a href="mailto:support@link.blog">support@link.blog</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

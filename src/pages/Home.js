// src/pages/Home.js
import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./Home.css";
import CreateAccountModal from "../components/CreateAccountModal/CreateAccount";

export default function Home() {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-center">
        <Container>
          <h1 className="hero-logo">Link</h1>
          <p className="hero-tagline">Where stories connect.</p>
          <Button href="/blog" variant="light" className="hero-btn">
            Check Blogs
          </Button>
        </Container>
      </section>
      {/* Section 2: About the Site */}
      <section className="about-section py-5">
        <Container onClick={() => setShowCreate(true)}>
          <Row className="justify-content-center text-center">
            <Col md={10} lg={8}>
              <h2 className="section-title mb-4">What is Link?</h2>
              <p className="section-description">
                <strong>Link</strong> is a clean, modern blogging platform
                designed to connect stories, ideas, and voices from around the
                world. Whether you’re a writer, reader, or both — Link gives you
                the tools to share your thoughts, inspire others, and explore
                meaningful content in a distraction-free space.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 3: What can the site be used for */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5 section-title">
            What Can You Do with Link?
          </h2>
          <Row className="g-4 text-center">
            <Col md={6} lg={3}>
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h5 className="feature-title">Write Blogs</h5>
                <p className="feature-description">
                  Share your thoughts, experiences, or expertise with a powerful
                  editor and a clean layout.
                </p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="feature-card">
                <div className="feature-icon">🌎</div>
                <h5 className="feature-title">Discover Content</h5>
                <p className="feature-description">
                  Explore blogs from different categories and discover new
                  perspectives every day.
                </p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h5 className="feature-title">Engage with Writers</h5>
                <p className="feature-description">
                  Comment, react, and follow your favorite authors to stay
                  updated with their latest posts.
                </p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h5 className="feature-title">Read Anywhere</h5>
                <p className="feature-description">
                  Optimized for mobile and tablet devices so you can stay
                  inspired on the go.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 4: Send Us a Coffee */}
      <section className="coffee-section py-5 text-center">
        <Container>
          <div className="coffee-card mx-auto">
            <h2 className="section-title mb-3">Enjoying Link?</h2>
            <p className="coffee-text mb-4">
              If you love what we're building, help keep the caffeine flowing.
              Every cup supports development, hosting, and improvements.
            </p>

            <div className="coffee-buttons d-flex justify-content-center gap-3">
              <a
                href="https://coff.ee/mjericodj" // Replace with your actual link
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-coffee"
              >
                ☕ <br /> Buy us a coffee
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
          </div>
        </Container>
      </section>

      {/* Section 5: Join the Community */}
      <section className="community-section py-5 text-center">
        <Container>
          <h2 className="section-title mb-3">Join the Link Community</h2>
          <p className="community-text mb-4">
            Get updates, follow amazing writers, and never miss a meaningful
            post. Become part of our growing creative space.
          </p>
          <Button
            variant="primary"
            className="btn-community"
            onClick={() => setShowCreate(true)}
          >
            Create an Account
          </Button>
        </Container>
      </section>

      <CreateAccountModal
        show={showCreate}
        handleClose={() => setShowCreate(false)}
        setShowLogin={setShowCreate}
      />

      {/* More sections will be added here */}
    </div>
  );
}

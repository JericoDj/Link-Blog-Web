import React, { useContext, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import { CommentContext } from "../../context/CommentContext";
import CreateBlogForm from "./CreateBlogForm"; // Import the new form component
import "./Blog.css";

const getRandomImage = () =>
  `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`;

export default function Blog() {
  const { blogs, loading } = useContext(BlogContext);
  const { commentsByBlogId, fetchCommentsByBlog } = useContext(CommentContext);

  // Optimized comment loading
  useEffect(() => {
    if (blogs.length > 0) {
      // Only fetch comments for blogs that don't have them
      const blogsWithoutComments = blogs.filter(
        blog => !commentsByBlogId[blog._id]
      );
      
      if (blogsWithoutComments.length > 0) {
        blogsWithoutComments.forEach((blog) => fetchCommentsByBlog(blog._id));
      }
    }
  }, [blogs, commentsByBlogId, fetchCommentsByBlog]);

  // Memoize sorted blogs
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [blogs]);

  return (
    <div className="blog-page">
      <section className="blog-hero text-center py-5 bg-light">
        <Container>
          <h1 className="display-4 fw-bold">Welcome to Our Blog</h1>
          <p className="lead text-muted">
            Latest stories, insights, and updates from Link.
          </p>
        </Container>
      </section>

      {/* Use the separated form component */}
      <CreateBlogForm />

      <section className="blog-list-section py-5">
        <Container>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : sortedBlogs.length > 0 ? (
            <Row>
              {sortedBlogs.map((post) => {
                const imageSrc = getRandomImage();
                const comments = commentsByBlogId[post._id] || [];
                const topComment = comments[0];

                return (
                  <Col key={post._id} lg={4} md={6} className="mb-4">
                    <Card className="blog-card h-100 shadow-sm">
                      <Card.Img
                        variant="top"
                        src={imageSrc}
                        alt={post.title}
                        className="blog-img"
                      />
                      <Card.Body className="d-flex flex-column">
                        <div className="blog-meta text-muted mb-2 small">
                          {new Date(post.createdAt).toLocaleDateString()} •{" "}
                          {post.author}
                        </div>
                        <Card.Title className="blog-title fs-5">
                          {post.title}
                        </Card.Title>
                        <Card.Text className="blog-excerpt text-muted small">
                          {post.content?.slice(0, 100)}...
                        </Card.Text>

                        {topComment && (
                          <div className="blog-comments-preview mt-3">
                            <strong className="small text-muted">
                              💬 {topComment.userId || "Guest"} says:
                            </strong>
                            <div className="text-muted small fst-italic">
                              “{topComment.content}”
                            </div>
                          </div>
                        )}

                        <div className="mt-auto pt-3">
                          <Button
                            as={Link}
                            to={`/blogDetail/${post._id}`}
                            variant="primary"
                          >
                            Read More
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div className="text-center text-muted">No blog posts found.</div>
          )}
        </Container>
      </section>
    </div>
  );
}
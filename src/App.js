import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";

import UserProvider from "./context/UserProvider";
import { UserContext } from "./context/UserContext";
import BlogProvider from "./context/BlogProvider";

import AppNavBar from "./components/AppNavBar";
import Footer from "./components/Footer/Footer.js";
import Home from "./pages/Home.js";
import Blog from "./pages/Blog/Blog.js";
import BlogDetail from "./pages/Blog/BlogDetail.js";
import Contact from "./pages/Contact/Contact.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CommentProvider from "./context/CommentProvider";

function AppRoutes() {
  const { user } = useContext(UserContext); // ✅ Correct way

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />

      <Route
        path="/blog"
        element={user?.isAdmin ? <AdminDashboard /> : <Blog />}
      />

      <Route path="/blogDetail/:id" element={<BlogDetail />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default function App() {
    const [user, setUser] = useState(null);
  return (
    <UserProvider>
      <CommentProvider>
      <BlogProvider>
      
          <Router>
            <AppNavBar />
            <AppRoutes />
            <Footer />
          </Router>
      
      </BlogProvider>
        </CommentProvider>
    </UserProvider>
  );
}

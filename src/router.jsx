import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Common Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import OurWorkPage from "./pages/OurWorkPage";
import MembershipPage from "./pages/MembershipPage";
import ResourcesPage from "./pages/ResourcesPage";
import EventsPage from "./pages/EventsPage";
import NewsPage from "./pages/NewsPage";
import YPFPage from "./pages/YPFPage";
import ProjectsPage from "./pages/ProjectsPage";
import PartnersPage from "./pages/PartnersPage";
import ContactPage from "./pages/ContactPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Member Dashboard
import MemberDashboard from "./pages/MemberDashboard";

// Admin Layout & Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminNews from "./pages/admin/AdminNews";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminResources from "./pages/admin/AdminResources";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminLogin from "./pages/admin/AdminLogin";

// Misc
import NotFound from "./pages/NotFound";

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
}

// Public Site Layout (with Header/Footer)
function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
}

// Main Router
export default function AppRouter() {
  const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/our-work", element: <OurWorkPage /> },
    { path: "/membership", element: <MembershipPage /> },
    { path: "/resources", element: <ResourcesPage /> },
    { path: "/events", element: <EventsPage /> },
    { path: "/news", element: <NewsPage /> },
    { path: "/ypf", element: <YPFPage /> },
    { path: "/projects", element: <ProjectsPage /> },
    { path: "/partners", element: <PartnersPage /> },
    { path: "/contact", element: <ContactPage /> },
  ];

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<Layout>{element}</Layout>} />
      ))}

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Member Dashboard */}
      <Route
        path="/member-dashboard"
        element={
          <ProtectedRoute allowedRoles={["member"]}>
            <Layout>
              <MemberDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="partners" element={<AdminPartners />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

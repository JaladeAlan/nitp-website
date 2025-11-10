// src/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
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

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Dashboards
import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Not Found
import NotFound from "./pages/NotFound";

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
}

// Layout wrapper with header/footer
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
      {/* Public routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<Layout>{element}</Layout>} />
      ))}

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboards */}
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
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Common Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import SEOWrapper from "./components/common/SEOWrapper";

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

// Public Site Layout
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
    { path: "/", element: <HomePage />, title: "Home - NITP", description: "Welcome to the Nigerian Institute of Technology and Projects" },
    { path: "/about", element: <AboutPage />, title: "About NITP", description: "Learn more about our mission and vision" },
    { path: "/our-work", element: <OurWorkPage />, title: "Our Work - NITP", description: "Explore our projects and initiatives" },
    { path: "/membership", element: <MembershipPage />, title: "Membership - NITP", description: "Join the NITP community" },
    { path: "/resources", element: <ResourcesPage />, title: "Resources - NITP", description: "Access our resources and tools" },
    { path: "/events", element: <EventsPage />, title: "Events - NITP", description: "Check out our events and programs" },
    { path: "/news", element: <NewsPage />, title: "News - NITP", description: "Latest updates and news" },
    { path: "/ypf", element: <YPFPage />, title: "YPF - NITP", description: "Youth Project Fund information" },
    { path: "/projects", element: <ProjectsPage />, title: "Projects - NITP", description: "Our ongoing and completed projects" },
    { path: "/partners", element: <PartnersPage />, title: "Partners - NITP", description: "Meet our partners" },
    { path: "/contact", element: <ContactPage />, title: "Contact - NITP", description: "Get in touch with us" },
  ];

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element, title, description }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <SEOWrapper title={title} description={description}>
                {element}
              </SEOWrapper>
            </Layout>
          }
        />
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
              <SEOWrapper title="Member Dashboard - NITP" description="Access your member dashboard">
                <MemberDashboard />
              </SEOWrapper>
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
      <Route
        path="*"
        element={
          <Layout>
            <SEOWrapper title="Page Not Found - NITP" description="The page you are looking for does not exist">
              <NotFound />
            </SEOWrapper>
          </Layout>
        }
      />
    </Routes>
  );
}

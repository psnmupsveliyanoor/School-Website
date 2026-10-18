import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import StaffPage from './pages/StaffPage';
import FacilitiesPage from './pages/FacilitiesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdmissionPage from './pages/AdmissionPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminEvents from './pages/admin/AdminEvents';
import AdminStaff from './pages/admin/AdminStaff';
import AdminGallery from './pages/admin/AdminGallery';
import AdminFacilities from './pages/admin/AdminFacilities';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Public layout wrapper
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-0">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />
          <Route
            path="/events"
            element={
              <PublicLayout>
                <EventsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/staff"
            element={
              <PublicLayout>
                <StaffPage />
              </PublicLayout>
            }
          />
          <Route
            path="/facilities"
            element={
              <PublicLayout>
                <FacilitiesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicLayout>
                <GalleryPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />
          <Route
            path="/admissions"
            element={
              <PublicLayout>
                <AdmissionPage />
              </PublicLayout>
            }
          />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect /admin → /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"    element={<AdminDashboard />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="events"       element={<AdminEvents />} />
            <Route path="staff"        element={<AdminStaff />} />
            <Route path="gallery"      element={<AdminGallery />} />
            <Route path="facilities"   element={<AdminFacilities />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

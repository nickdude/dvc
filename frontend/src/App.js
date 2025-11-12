import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PlanPage from "./Pages/PlanPage";
import SmartCardPage from "./Pages/SmartCardPage";
import TemplatePage from "./Pages/TemplatePage";
import Dashboard from "./Pages/Dashboard";
import VerifyEmail from "./Pages/VerifyEmail";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminDashboard from "./Pages/AdminDashboard";
import CardViewer from "./Pages/CardViewer";
import MyCards from "./Pages/MyCards";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/ToastContainer";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  // redirect users with active subscription to /smart-cards when they land on root/plans/login
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prevAuthRef = React.useRef(false);
  const initialMountRef = React.useRef(true);

  React.useEffect(() => {
    try {
      if (loading) return;
      if (!isAuthenticated) return;
      const path = location.pathname || '/';
      const sub = user?.subscription;
      const hasActive = sub && sub.endDate && new Date(sub.endDate).getTime() > Date.now();

      // Only auto-redirect to /smart-cards in two cases:
      // 1) Immediately after the user becomes authenticated (login flow)
      // 2) On initial app load when the user lands on the home page '/'
      // This avoids interfering with in-app navigation (e.g., clicking Navbar links or visiting /plans)
      const prevAuth = prevAuthRef.current;
      if (hasActive) {
        if ((prevAuth === false && isAuthenticated === true) || (initialMountRef.current === true && path === '/')) {
          navigate('/smart-cards', { replace: true });
        }
      }
    } catch (e) {
      // ignore
    }
    // track previous auth and initial mount
    prevAuthRef.current = isAuthenticated;
    initialMountRef.current = false;
  }, [isAuthenticated, user, loading, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Preparing your experience…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet /> {/* This is where the nested page will render */}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/plans" element={
                <ProtectedRoute>
                  <PlanPage />
                </ProtectedRoute>
              } />
              <Route path="/smart-cards" element={
                <ProtectedRoute>
                  <SmartCardPage />
                </ProtectedRoute>
              } />
              <Route path="/template" element={
                <ProtectedRoute>
                  <TemplatePage />
                </ProtectedRoute>
              } />
              <Route path="/my-cards" element={
                <ProtectedRoute>
                  <MyCards />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/:id" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/card/:cardId" element={<CardViewer />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

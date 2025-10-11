import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
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
    </AuthProvider>
  );
}

export default App;

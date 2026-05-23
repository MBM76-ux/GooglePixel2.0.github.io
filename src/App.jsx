import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import PageNotFound from "./components/pages/PageNotFound";
import StudentsPage from "./components/pages/StudentsPage";
import AddStudentPage from "./components/pages/AddStudentPage";
import EditStudentPage from "./components/pages/EditStudentPage";
import StudentDetailPage from "./components/pages/StudentDetailPage";
import AdminDashboard from "./components/pages/AdminDashboard";
import UserDashboard from "./components/pages/UserDashboard";
import { ProtectedRoute, AdminRoute, UserRoute } from "./components/layouts/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
        <Route path="/students/add" element={<ProtectedRoute><AddStudentPage /></ProtectedRoute>} />
        <Route path="/students/:id" element={<ProtectedRoute><StudentDetailPage /></ProtectedRoute>} />
        <Route path="/students/edit/:id" element={<ProtectedRoute><EditStudentPage /></ProtectedRoute>} />

        {/* Admin Route */}
        <Route path="/dashboard/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* User Route */}
        <Route path="/dashboard/user" element={<UserRoute><UserDashboard /></UserRoute>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <footer className="text-center p-4 bg-gray-200">
        © 2026 Google Pixel Clone | All Rights Reserved
      </footer>
    </>
  );
};

export default App;
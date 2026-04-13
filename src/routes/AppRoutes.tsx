import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Profile from "../pages/auth/Profile";
import ProtectedRoute from "./ProtectedRoute";
import SendOtp from "../pages/auth/SendOtp";
import Register from "../pages/auth/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/send-otp" element={<SendOtp />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

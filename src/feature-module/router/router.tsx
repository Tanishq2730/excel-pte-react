import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, adminRoutes } from "./router.link";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import Login from "../auth/login/login";
import AdminDashboard from "../mainMenu/adminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../../core/data/redux/store";

const ALLRoutes: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Routes>
      {/* Redirect logged-in users to the dashboard */}
      <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
      
      {/* Protect Public Routes */}
      <Route element={<ProtectedRoute><Feature /></ProtectedRoute>}>
        {adminRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>

      {/* Protect Auth Routes */}
      <Route element={<ProtectedRoute><AuthFeature /></ProtectedRoute>}>
        {authRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>
    </Routes>
  );
};

export default ALLRoutes;

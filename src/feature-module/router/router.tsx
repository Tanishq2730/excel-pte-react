import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, adminRoutes } from "./router.link";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import Login from "../auth/login/login";
import Error401 from "../pages/error/error-401";
import { useSelector } from "react-redux";
import { RootState } from "../../core/data/redux/store";
import { getUserPermissions } from "../../api/commonAPI";
import ProtectedRoute from "./ProtectedRoute";

const ALLRoutes: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      loadUserPermissions();
    }
  }, [token]);

  const loadUserPermissions = async () => {
    try {
      const response = await getUserPermissions();
      if (response.success) {
        setUserPermissions(response.data); // Store user permissions
      } else {
        setUserPermissions([]); // No permissions → Block access
      }
    } catch (error) {
      console.error("Error fetching user permissions:", error);
      setUserPermissions([]); // Error → Block access
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to check if user has permission
  const hasPermission = (routePermission: string) => userPermissions.includes(routePermission);

  // ✅ Filter admin and auth routes based on permissions
  const filteredAdminRoutes = adminRoutes.filter(route =>
    route.permission ? hasPermission(route.permission) : true
  ); 


  return (
    <Routes>
      {/* Redirect logged-in users to the dashboard */}
      <Route path="/" element={token ? <Navigate to="/welcome-dashboard" replace /> : <Login />} />

      {/* Protect Public Routes */}
      <Route element={<ProtectedRoute><Feature /></ProtectedRoute>}>
        {filteredAdminRoutes.length > 0 ? (
          filteredAdminRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))
        ) : (
          <Route path="*" element={<Error401 />} />
        )}
      </Route>      

      {/* Protect Auth Routes */}
      <Route element={<AuthFeature />}>
        {authRoutes.length > 0 ? (
          authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))
        ) : (
          <Route path="*" element={<Error401 />} />
        )}
      </Route>

      {/* Default 500 Error Page for Unauthorized Access */}
      <Route path="*" element={<Error401 />} />
    </Routes>
  );
};

export default ALLRoutes;

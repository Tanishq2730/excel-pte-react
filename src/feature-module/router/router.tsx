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
import { useNavigate } from "react-router-dom";


const ALLRoutes: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      loadUserPermissions();
    }else{
      navigate("/", { replace: true });
    }
  }, [token]);

  const loadUserPermissions = async () => {
  try {
    const response = await getUserPermissions();
console.log("User Permissions Response:", response); // Debugging line

    // Check for invalid token based on your API response
    if (response.message === "Invalid token" || (response.success && Array.isArray(response.data) && response.data.length === 0)) {
      // Clear auth state or token if stored locally
      // dispatch(logout()); // if you use Redux
      console.log("Invalid token or no permissions found. Redirecting to login.");
      localStorage.removeItem("token"); // Clear token from localStorage
      localStorage.removeItem("user");
      navigate("/", { replace: true }); // redirect to login
      return;
    }

    if (response.success) {
      setUserPermissions(response.data); // Set permissions normally
    } else {
      setUserPermissions([]);
    }
  } catch (error) {
    console.error("Error fetching user permissions:", error);
    navigate("/", { replace: true }); // Fallback for any fetch error
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

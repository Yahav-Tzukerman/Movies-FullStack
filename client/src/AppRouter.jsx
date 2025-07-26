import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import UsersPage from "./pages/UsersPage";

const AppRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin Routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedPermissions={["View Users"]}>
            <UsersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movies"
        element={
          <ProtectedRoute allowedPermissions={["View Movies"]}>
            <PageNotFound />
            {/* <MoviesPage /> */}
          </ProtectedRoute>
        }
      />

      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute allowedPermissions={["View Subscriptions"]}>
            <PageNotFound />
            {/* <SubscriptionsPage /> */}
          </ProtectedRoute>
        }
      />

      {/* Error Pages */}
      <Route path="/404" element={<PageNotFound />} />
      <Route path="/403" element={<UnAuthorizedPage />} />
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <LoginPage />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;

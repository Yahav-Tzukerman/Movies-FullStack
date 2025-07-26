import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ allowedPermissions, children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Wait for the auth state and validation to load
  if (loading) return <p>Loading...</p>;

  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  // Redirect to Unauthorized page if role is not allowed
  if (
    allowedPermissions &&
    !user?.permissions.includes(allowedPermissions[0])
  ) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;

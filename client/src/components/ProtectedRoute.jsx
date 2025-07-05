import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import usersService from "../services/users.service";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken(); // Validate token
        const { data: roleFromFireBase } = await usersService.getUserRole(
          currentUser.uid
        );
        if (user && user.token === token && user.role === roleFromFireBase) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Wait for the auth state and validation to load
  if (loading || isValid === null) return <p>Loading...</p>;

  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  // Redirect to 403 Forbidden if token is invalid
  if (!isValid) {
    return <Navigate to="/403" replace />;
  }

  // Redirect to Unauthorized page if role is not allowed
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;

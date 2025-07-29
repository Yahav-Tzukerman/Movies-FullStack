import { useState, useEffect, useCallback } from "react";
import UsersService from "../services/users.service";
import { useSelector } from "react-redux";

export function useUsers() {
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    UsersService.getAllUsers(token)
      .then((res) => setUsers(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch users")
      )
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (token) reload();
  }, [token, reload]);

  const createUser = async (userData) => {
    setActionLoading(true);
    setError("");
    try {
      await UsersService.createUser(userData, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    setActionLoading(true);
    setError("");
    try {
      await UsersService.updateUser(id, userData, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setActionLoading(true);
    setError("");
    try {
      await UsersService.deleteUser(id, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    setError,
    reload,
    createUser,
    updateUser,
    deleteUser,
    actionLoading,
  };
}

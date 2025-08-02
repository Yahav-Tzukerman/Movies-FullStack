import { useState, useEffect, useCallback } from "react";
import UsersService from "../services/users.service";
import { useSelector } from "react-redux";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    UsersService.getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch users")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const createUser = async (userData) => {
    setActionLoading(true);
    setError("");
    try {
      await UsersService.createUser(userData);
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
      await UsersService.updateUser(id, userData);
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
      await UsersService.deleteUser(id);
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

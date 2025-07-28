import { useState, useEffect, useCallback } from "react";
import MembersService from "../services/members.service";
import SubscriptionsService from "../services/subscriptions.service";
import { useSelector } from "react-redux";

export function useMembers() {
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    MembersService.getAllMembers(token)
      .then((res) => setMembers(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch members")
      )
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (token) reload();
  }, [token, reload]);

  const createMember = async (memberData) => {
    setActionLoading(true);
    setError("");
    try {
      await MembersService.createMember(memberData, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create member");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updateMember = async (id, memberData) => {
    setActionLoading(true);
    setError("");
    try {
      await MembersService.updateMember(id, memberData, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update member");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteMember = async (id) => {
    setActionLoading(true);
    setError("");
    try {
      await MembersService.deleteMember(id, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete member");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const addMovieToSubscriptionByMember = async (memberId, movieData) => {
      setActionLoading(true);
      setError("");
      try {
        await SubscriptionsService.addMovieToSubscriptionByMember(memberId, movieData, token);
        reload();
        return true;
      } catch (err) {
        setError(err.response?.data?.message || "Failed to subscribe to movie");
        return false;
      } finally {
        setActionLoading(false);
      }
  };

  return {
    members,
    loading,
    error,
    reload,
    createMember,
    updateMember,
    deleteMember,
    actionLoading,
    addMovieToSubscriptionByMember
  };
}

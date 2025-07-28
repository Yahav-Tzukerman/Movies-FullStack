import { useState, useEffect, useCallback } from "react";
import SubscriptionsService from "../services/subscriptions.service";
import { useSelector } from "react-redux";

export function useSubscriptions() {
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    SubscriptionsService.getAllSubscriptions(token)
      .then((res) => setSubscriptions(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch subscriptions")
      )
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (token) reload();
  }, [token, reload]);


  return {
    subscriptions,
    loading,
    error,
    reload
  };
}
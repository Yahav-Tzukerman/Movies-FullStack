import { useState, useEffect, useCallback } from "react";
import SubscriptionsService from "../services/subscriptions.service";
import { useSelector } from "react-redux";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    SubscriptionsService.getAllSubscriptions()
      .then((res) => setSubscriptions(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch subscriptions")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    subscriptions,
    loading,
    error,
    reload,
  };
}

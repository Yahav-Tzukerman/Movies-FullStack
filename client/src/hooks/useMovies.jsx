import { useState, useEffect, useCallback } from "react";
import MoviesService from "../services/movies.service";
import { useSelector } from "react-redux";

export function useMovies() {
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    MoviesService.getAllMovies(token)
      .then((res) => setMovies(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch movies")
      )
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (token) reload();
  }, [token, reload]);

  const createMovie = async (movieData) => {
    setActionLoading(true);
    setError("");
    try {
      await MoviesService.createMovie(movieData, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create movie");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updateMovie = async (id, movieData) => {
    setActionLoading(true);
    setError("");
    try {
      await MoviesService.updateMovie(id, movieData, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update movie");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    setActionLoading(true);
    setError("");
    try {
      await MoviesService.deleteMovie(id, token);
      reload();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete movie");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    reload,
    createMovie,
    updateMovie,
    deleteMovie,
    actionLoading,
  };
}

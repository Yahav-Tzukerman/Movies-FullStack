import { useState, useEffect, useCallback } from "react";
import MoviesService from "../services/movies.service";
import { useSelector } from "react-redux";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    MoviesService.getAllMovies()
      .then((res) => setMovies(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch movies")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const createMovie = async (movieData) => {
    setActionLoading(true);
    setError("");
    try {
      await MoviesService.createMovie(movieData);
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
      await MoviesService.updateMovie(id, movieData);
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
      await MoviesService.deleteMovie(id);
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
    setError,
    reload,
    createMovie,
    updateMovie,
    deleteMovie,
    actionLoading,
  };
}

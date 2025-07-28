import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { useMovies } from "../hooks/useMovies";
import AddIcon from "@mui/icons-material/Add";
import AppInput from "../components/common/AppInput";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import AppErrorPopApp from "../components/common/AppErrorPopApp";
import AppButton from "../components/common/AppButton";
import appTheme from "../styles/theme";

const MoviesPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { movies, loading, reload, deleteMovie } = useMovies();
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, [location.search]);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditMovie(null);
    setModalOpen(true);
  };
  const handleEdit = (movie) => {
    setEditMovie(movie);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      deleteMovie(id)
        .then(reload())
        .catch((err) =>
          setError(err.response?.data?.message || "Failed to delete movie")
        );
    }
  };

  const handleModalSave = () => {
    setModalOpen(false);
    reload();
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={5} position="relative" minHeight="60vh">
      <Paper
        elevation={4}
        sx={{ p: 4, background: theme.colors.cardBackground }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" sx={{ color: theme.colors.textLight }}>
            Movies Management
          </Typography>
          {user?.permissions?.includes("Create Movies") && (
            <AppButton
              variant="primary"
              label={<AddIcon />}
              onClick={handleAdd}
            />
          )}
        </Box>
        <Box mb={2}>
          <AppInput
            label="Search movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by movie name"
            fullWidth
          />
        </Box>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard
                movie={movie}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <MovieModal
        open={modalOpen}
        handleClose={handleCloseModal}
        editMovie={editMovie}
        onSave={handleModalSave}
      />
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1300}
          sx={{ background: "rgba(0,0,0,0.2)" }}
        >
          <CircularProgress size={64} color="primary" thickness={5} />
        </Box>
      )}
      <AppErrorPopApp message={error} onClose={() => setError("")} />
    </Box>
  );
};

export default MoviesPage;

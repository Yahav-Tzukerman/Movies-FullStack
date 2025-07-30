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
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const location = useLocation();
  const {
    movies,
    loading,
    reload,
    deleteMovie,
    error: dbError,
    setError: setDbError,
  } = useMovies();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, [location.search]);

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
    deleteMovie(id)
      .then((isDeleted) => {
        reload();
        setPopup({
          show: true,
          message: isDeleted
            ? "Movie deleted successfully"
            : "Failed to delete movie",
          type: isDeleted ? "success" : "error",
        });
      })
      .catch((err) => {
        setPopup({
          show: true,
          message: err.response?.data?.message || "Failed to delete movie",
          type: "error",
        });
      });
  };

  const handleModalSave = () => {
    setModalOpen(false);
    setEditMovie(null);
    reload();
  };

  const handleCloseErrorPopup = () => {
    setPopup({ ...popup, show: false, message: "" });
    setDbError("");
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={5} position="relative" minHeight="60vh">
      <AppErrorPopApp
        show={popup.show || Boolean(dbError)}
        label={popup.message || dbError}
        handleClose={handleCloseErrorPopup}
        variant={popup.type}
      />
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
    </Box>
  );
};

export default MoviesPage;

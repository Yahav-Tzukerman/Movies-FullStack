import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Grid } from "@mui/material";
import MoviesService from "../services/movies.service";
import AddIcon from "@mui/icons-material/Add";
import AppInput from "../components/common/AppInput";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import AppErrorPopApp from "../components/common/AppErrorPopApp";
import AppButton from "../components/common/AppButton";
import appTheme from "../styles/theme";

const MoviesPage = () => {
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
    MoviesService.getAllMovies(token)
      .then((res) => setMovies(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch movies")
      );
  };

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
      MoviesService.deleteMovie(id, token)
        .then(loadMovies)
        .catch((err) =>
          setError(err.response?.data?.message || "Failed to delete movie")
        );
    }
  };

  const handleModalSave = () => {
    setModalOpen(false);
    loadMovies();
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={5}>
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
      <AppErrorPopApp message={error} onClose={() => setError("")} />
    </Box>
  );
};

export default MoviesPage;

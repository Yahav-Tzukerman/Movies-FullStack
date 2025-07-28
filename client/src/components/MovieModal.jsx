import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from "@mui/material";
import AppInput from "./common/AppInput";
import AppButton from "./common/AppButton";
import MoviesService from "../services/movies.service";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";
import AppComboBox from "./common/AppComboBox";

const GENRE_OPTIONS = [
  "Drama", "Comedy", "Action", "Science-Fiction", "Romance", "Crime", "Thriller",
  "Adventure", "Horror", "Fantasy", "Family", "Animation", "Mystery", "History", "Music",
  "Documentary", "War", "Western", "Supernatural", "Other"
];

const MovieModal = ({ open, handleClose, editMovie, onSave }) => {
  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const isEdit = Boolean(editMovie);
  const [form, setForm] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (editMovie) {
      setForm({
        name: editMovie.name || "",
        genres: editMovie.genres || [],
        image: editMovie.image || "",
        premiered: editMovie.premiered ? editMovie.premiered.slice(0, 10) : "", // yyyy-mm-dd
      });
      setErrors([]);
    } else {
      setForm({
        name: "",
        genres: [],
        image: "",
        premiered: "",
      });
      setErrors([]);
    }
  }, [editMovie, open]);

    const handleNameChange = (e) => {
        setForm((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleImageChange = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.value }));
    };

    const handlePremieredChange = (e) => {
        setForm((prev) => ({ ...prev, premiered: e.target.value }));
    };

  const handleGenresChange = (event) => {
    const { value } = event.target;
    setForm((prev) => ({
      ...prev,
      genres: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = [];
    if (!form.name) errs.push("Movie name is required.");
    if (!form.premiered) errs.push("Premiered date is required.");
    if (!form.image) errs.push("Image URL is required.");
    if (!form.genres.length) errs.push("At least one genre is required.");
    setErrors(errs);
    if (errs.length) return;
    try {
      if (isEdit) {
        await MoviesService.updateMovie(editMovie._id, form, token);
      } else {
        await MoviesService.createMovie(form, token);
      }
      onSave();
    } catch (err) {
      setErrors([
        err.response?.data?.message || "Failed to save movie, check your data.",
      ]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box sx={{ background: theme.colors.cardBackground }}>
            <form onSubmit={handleSubmit} autoComplete="off">
                <DialogTitle sx={{ color: theme.colors.textLight, fontSize: 24 }}>
                {isEdit ? "Edit Movie" : "Add New Movie"}
                </DialogTitle>
                <DialogContent sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ mt: 1 }}>
                        <AppInput
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleNameChange}
                            error={errors.includes("Movie name is required.")}
                            errorMessage={<span>Movie name is required.</span>}
                            instructions={"Movie name is required."}
                        />
                    </Box>
                    <AppComboBox
                        name="Genres"
                        label="Genres"
                        options={GENRE_OPTIONS}
                        value={form.genres}
                        onChange={handleGenresChange}
                        error={errors.includes("genres")}
                        errorMessage={<span>At least one genre is required.</span>}
                        instructions={"Select at least one genre."}
                        multiple
                        fullWidth
                    />
                    <AppInput
                        type="text"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleImageChange}
                        error={errors.includes("Image URL is required.")}
                        errorMessage={<span>Image URL is required.</span>}
                        instructions={"Image URL is required."}
                    />
                    <AppInput
                        type="date"
                        placeholder="Premiered Date"
                        value={form.premiered}
                        onChange={handlePremieredChange}
                        error={errors.includes("Premiered date is required.")}
                        errorMessage={<span>Premiered date is required.</span>}
                        instructions={"Premiered date is required."}
                    />
                    {errors.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                        {errors.map((err, idx) => (
                            <Box key={idx} color="error.main" fontSize={14}>
                            {err}
                            </Box>
                        ))}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                <AppButton onClick={handleClose} variant="muted" label="Cancel" size={"sm"} />
                <AppButton
                    variant="primary"
                    label={isEdit ? "Update Movie" : "Create Movie"}
                    onClick={handleSubmit}
                    size={"sm"}
                />
                </DialogActions>
            </form>
        </Box>
    </Dialog>
  );
};

export default MovieModal;

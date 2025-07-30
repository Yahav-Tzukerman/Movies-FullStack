import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import AppInput from "./common/AppInput";
import AppButton from "./common/AppButton";
import { useMovies } from "../hooks/useMovies";
import {
  GENERES,
  validateGenres,
  validateImageUrl,
  validateMovieFull,
  validatePremieredDate,
  validateName,
} from "../utils/movieValidation";
import AppErrorPopApp from "./common/AppErrorPopApp";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";
import AppComboBox from "./common/AppComboBox";

const GENRE_OPTIONS = GENERES;

const MovieModal = ({ open, handleClose, editMovie, onSave }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const isEdit = Boolean(editMovie);
  const [formErrors, setFormErrors] = useState([]);
  const {
    createMovie,
    updateMovie,
    error: dbError,
    setError: setDbError,
  } = useMovies();

  const [form, setForm] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    if (editMovie) {
      setForm({
        name: editMovie.name || "",
        genres: editMovie.genres || [],
        image: editMovie.image || "",
        premiered: editMovie.premiered ? editMovie.premiered.slice(0, 10) : "", // yyyy-mm-dd
      });
      setFormErrors([]);
    } else {
      setForm({
        name: "",
        genres: [],
        image: "",
        premiered: "",
      });
      setFormErrors([]);
    }
  }, [editMovie, open]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (validateName(value).length) {
      setFormErrors((prev) => [...prev, "name"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "name"));
    }
    setForm((prev) => ({ ...prev, name: value }));
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    if (validateImageUrl(value).length) {
      setFormErrors((prev) => [...prev, "image"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "image"));
    }
    setForm((prev) => ({ ...prev, image: value }));
  };

  const handlePremieredChange = (e) => {
    const value = e.target.value;
    if (validatePremieredDate(value).length) {
      setFormErrors((prev) => [...prev, "premiered"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "premiered"));
    }
    setForm((prev) => ({ ...prev, premiered: value }));
  };

  const handleGenresChange = (event) => {
    const { value } = event.target;
    if (validateGenres(value).length) {
      setFormErrors((prev) => [...prev, "genres"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "genres"));
    }
    setForm((prev) => ({
      ...prev,
      genres: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateMovieFull(form);
    if (errs.length) {
      setFormErrors(errs);
      setPopup({
        show: true,
        message: errs.join(" "),
        type: "error",
      });
      return;
    }

    let isSaveValid;
    if (isEdit) {
      isSaveValid = await updateMovie(editMovie._id, form);
    } else {
      isSaveValid = await createMovie(form);
    }

    if (isSaveValid) {
      setPopup({
        show: true,
        message: isEdit
          ? "Movie updated successfully!"
          : "Movie created successfully!",
        type: "success",
      });

      setTimeout(() => {
        setPopup({ ...popup, show: false });
        onSave();
      }, 1200);
    }
  };

  const handleCloseErrorPopup = () => {
    setPopup({ ...popup, show: false, message: "" });
    setDbError("");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ background: theme.colors.cardBackground }}>
        <AppErrorPopApp
          show={popup.show || Boolean(dbError)}
          label={popup.message || dbError}
          handleClose={handleCloseErrorPopup}
          variant={popup.type}
        />
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle sx={{ color: theme.colors.textLight, fontSize: 24 }}>
            {isEdit ? "Edit Movie" : "Add New Movie"}
          </DialogTitle>
          <DialogContent
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ mt: 1 }}>
              <AppInput
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleNameChange}
                error={formErrors.includes("name")}
                errorMessage={
                  <span>
                    Invalid title: 2-100 chars, letters and numbers only.
                  </span>
                }
                instructions={"Movie name is required."}
              />
            </Box>
            <AppComboBox
              name="Genres"
              label="Genres"
              options={GENRE_OPTIONS}
              value={form.genres}
              onChange={handleGenresChange}
              error={formErrors.includes("genres")}
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
              error={formErrors.includes("image")}
              errorMessage={
                <span>
                  Invalid image URL: must be a valid image link (png, jpg, jpeg,
                  gif, webp).
                </span>
              }
              instructions={"Image URL is required."}
            />
            <AppInput
              type="date"
              placeholder="Premiered Date"
              value={form.premiered}
              onChange={handlePremieredChange}
              error={formErrors.includes("premiered")}
              errorMessage={<span>Invalid premiered date.</span>}
              instructions={"Premiered date is required."}
            />
          </DialogContent>
          <DialogActions>
            <AppButton
              onClick={handleClose}
              variant="muted"
              label="Cancel"
              size={"sm"}
            />
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

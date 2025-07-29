import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  List,
  ListItem,
  Button,
  Divider,
  Link,
  Collapse,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";
import AppComboBox from "./common/AppComboBox";
import AppInput from "./common/AppInput";
import { useNavigate } from "react-router-dom";

const MemberCard = ({
  member,
  allMovies,
  onEdit,
  onDelete,
  onSubscribe,
  canSubscribe,
}) => {
  const { user } = useSelector((state) => state.auth);
  const permissions = user?.permissions || [];
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [addOpen, setAddOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const watchedMovieIds = member.movies.map((m) => m.movieId);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => setDeleteOpen(true);
  const handleCloseDelete = () => setDeleteOpen(false);
  const handleConfirmDelete = () => {
    setDeleteOpen(false);
    onDelete(user.id);
  };
  
  const unwatchedMovies = allMovies.filter(
    (movie) => !watchedMovieIds.includes(movie._id)
  );

  const handleSubscribe = () => {
    if (selectedMovieId && selectedDate) {
      onSubscribe(member._id, selectedMovieId, selectedDate);
      setSelectedMovieId("");
      setSelectedDate("");
      setAddOpen(false);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        minHeight: 320,
        width: 330,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: theme.colors.innerCardBackground,
        transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
        "&:hover": { boxShadow: 7, transform: "scale(1.035)" },
      }}
    >
      <CardContent sx={{ width: "100%", color: theme.colors.textLight }}>
        <Box textAlign="center">
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48, mx: "auto", mb: 1 }}>
            {member.name[0]?.toUpperCase() || "M"}
          </Avatar>
          <Typography variant="h6">{member.name}</Typography>
          <Typography variant="body2" color={theme.colors.textMuted} fontWeight="bold">
            Email: {member.email}
          </Typography>
          <Typography variant="body2" color={theme.colors.textMuted} fontWeight="bold">
            City: {member.city}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" fontWeight={700} sx={{ color: theme.colors.textLight }}>
          Watched Movies:
        </Typography>

        <List dense sx={{ pt: 0, pb: 0 }}>
          {member.movies.length > 0 ? member.movies.map((movie, i) => (
            <ListItem
              key={movie.movieId || i}
              sx={{
                px: 0.5, py: 0, display: "flex", justifyContent: "space-between", fontSize: 14,
              }}
            >
              <Link
                component="button"
                underline="hover"
                color={theme.colors.textLight}
                onClick={() =>
                  navigate(`/movies?search=${encodeURIComponent(movie.movieName)}`)
                }
              >
                {movie.movieName}
              </Link>
              <span style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                {movie.date ? new Date(movie.date).toLocaleDateString("he-IL") : ""}
              </span>
            </ListItem>
          )) : (
            <Typography variant="body2" color={theme.colors.textMuted} textAlign="center" sx={{ width: "100%", mt: 1 }}>
              No movies subscribed yet.
            </Typography>
          )}
        </List>

        {/* Subscribe to new movie */}
        {canSubscribe && (
          <>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2, color: theme.colors.textLight, background: theme.colors.background, fontSize: "0.8rem", p: 1 }}
              onClick={() => setAddOpen((prev) => !prev)}
              size="small"
            >
              {addOpen ? "Cancel" : "Subscribe to new movie"}
            </Button>
            <Collapse in={addOpen}>
              <Box sx={{ mt: 1 }}>
                <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                  <InputLabel sx={{ color: theme.colors.textLight }}>Movie</InputLabel>
                  <Select
                    sx={{
                      background: theme.colors.inputBackground,
                      color: theme.colors.textLight,
                      border: "1px solid " + theme.colors.inputBorder,
                      borderRadius: theme.input.borderRadius,
                    }}
                    value={selectedMovieId}
                    label="Movie"
                    onChange={(e) => setSelectedMovieId(e.target.value)}
                  >
                    {unwatchedMovies.length === 0 && (
                      <MenuItem value="">No more movies</MenuItem>
                    )}
                    {unwatchedMovies.map((movie) => (
                      <MenuItem value={movie._id} key={movie._id}>
                        {movie.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ mt: 1 }}>
                  <AppInput
                    type="date"
                    placeholder={"Subscription Date"}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    error={!selectedDate}
                    errorMessage={<span>Date is required.</span>}
                    instructions={"Select a date for the subscription."}
                    fullWidth
                  />
                </Box>
                <Button
                  onClick={handleSubscribe}
                  sx={{ mt: 1, background: theme.colors.primary }}
                  disabled={!selectedMovieId || !selectedDate}
                  variant="contained"
                  size="small"
                >
                  Subscribe
                </Button>
              </Box>
            </Collapse>
          </>
        )}

        <Box display="flex" justifyContent="center" gap={1} mt={2}>
          { permissions?.includes("Update Subscriptions") && (
            
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => onEdit(member)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          )}
          { permissions?.includes("Delete Subscriptions") && (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          )}
        </Box>
      </CardContent>
      <Dialog open={deleteOpen} onClose={handleCloseDelete} sx={{ backdropFilter: "blur(4px)", color: theme.colors.innerCardBackground }}>
        <DialogTitle>
          Are you sure you want to delete member "{member.name}"?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>  
    </Card>
  );
};

export default MemberCard;

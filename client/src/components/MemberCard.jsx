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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";

const MemberCard = ({
  member,
  allMovies,
  onEdit,
  onDelete,
  onSubscribe,
  canSubscribe,
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [addOpen, setAddOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const watchedMovieIds = member.movies.map((m) => m.movieId);

  // רק סרטים שעדיין לא נצפו
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
      <CardContent sx={{ width: "100%" }}>
        <Box textAlign="center">
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48, mx: "auto", mb: 1 }}>
            {member.name[0]?.toUpperCase() || "M"}
          </Avatar>
          <Typography variant="h6">{member.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {member.email} | {member.city}
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
              <Link href={`/movies/${movie.movieId}`} underline="hover" color={theme.colors.textLight}>
                {movie.movieName}
              </Link>
              <span style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                {movie.date ? new Date(movie.date).toLocaleDateString("he-IL") : ""}
              </span>
            </ListItem>
          )) : (
            <Typography variant="body2" color="text.secondary">
              No movies yet.
            </Typography>
          )}
        </List>

        {/* Subscribe to new movie */}
        {canSubscribe && (
          <>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 1 }}
              onClick={() => setAddOpen((prev) => !prev)}
              size="small"
            >
              {addOpen ? "Cancel" : "Subscribe to new movie"}
            </Button>
            <Collapse in={addOpen}>
              <Box sx={{ mt: 1 }}>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Movie</InputLabel>
                  <Select
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
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    background: theme.colors.inputBackground,
                    color: theme.colors.textLight,
                    border: "1px solid " + theme.colors.inputBorder,
                    borderRadius: theme.input.borderRadius,
                    padding: 6,
                    fontFamily: theme.fontFamily,
                    width: "100%",
                  }}
                />
                <Button
                  onClick={handleSubscribe}
                  sx={{ mt: 1 }}
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
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => onEdit(member)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(member._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MemberCard;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  List,
  ListItem,
  Link,
  Dialog,
  DialogActions,
  DialogTitle,
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const permissions = user?.permissions || [];
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => setDeleteOpen(true);
  const handleCloseDelete = () => setDeleteOpen(false);
  const handleConfirmDelete = () => {
    setDeleteOpen(false);
    onDelete(movie.id);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        minHeight: 450,
        width: 330,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: theme.colors.innerCardBackground,
        transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
        "&:hover": {
          boxShadow: 7,
          transform: "scale(1.035)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={movie.image}
        alt={movie.name}
        height="180"
        sx={{ objectFit: "cover", borderRadius: 2, mt: 2, width: "95%" }}
      />
      <CardContent
        sx={{
          textAlign: "center",
          width: "100%",
          px: 3,
          pt: 2,
          pb: 1,
          color: theme.colors.textLight,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {movie.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Year: {new Date(movie.premiered).getFullYear()}
        </Typography>
        <Box sx={{ mb: 1 }}>
          {movie.genres.map((genre, i) => (
            <Chip key={i} label={genre} size="small" sx={{ m: 0.5, backgroundColor: theme.colors.cardBackground, color: theme.colors.textLight, p: 0.5, fontWeight: 700 }} />
          ))}
        </Box>
                <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: theme.colors.textLight }}>
          Subscribers:
        </Typography>
        {movie.subscribers?.length > 0 ? (
          <List dense sx={{ pt: 0, pb: 0 }}>
            {movie.subscribers.map((sub, i) => (
              <ListItem
                key={sub.memberId || i}
                sx={{
                  px: 0.5,
                  py: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  color: theme.colors.textLight,
                }}
              >
                <Box>
                  <Link
                  component="button"
                  underline="hover"
                  color={theme.colors.textLight}
                  onClick={() =>
                    navigate(`/subscriptions?search=${encodeURIComponent(sub.memberName)}`)
                  }
                >
                  {sub.memberName}
                </Link>
                </Box>
                <Box sx={{ fontSize: 12, color: theme.colors.textLight }}>
                  {sub.date ? new Date(sub.date).toLocaleDateString("he-IL") : ""}
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" sx={{ textAlign: "center", color: theme.colors.textLight }}>
            No subscribers yet.
          </Typography>
        )}
        <Box display="flex" justifyContent="center" gap={1} mt={1}>
          {permissions.includes("Update Movies") && (
            <Tooltip title="Edit">
              <IconButton color="primary" onClick={() => onEdit(movie)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {permissions.includes("Delete Movies") && (
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
          Are you sure you want to delete movie "{movie.name}"?
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

export default MovieCard;

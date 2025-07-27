import React from "react";
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
  Link
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";

const MovieCard = ({ movie, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const permissions = user?.permissions || [];
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

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
                  {/* אם יש דף מנוי - עשה קישור */}
                  <Link href={`/members/${sub.memberId}`} underline="hover" color={theme.colors.textLight}>
                    {sub.memberName}
                  </Link>
                </Box>
                <Box sx={{ fontSize: 12, color: theme.colors.textSecondary }}>
                  {sub.date ? new Date(sub.date).toLocaleDateString("he-IL") : ""}
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
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
              <IconButton color="error" onClick={() => onDelete(movie._id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;

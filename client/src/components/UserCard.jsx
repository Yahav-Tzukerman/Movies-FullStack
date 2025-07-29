import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import appTheme from "../styles/theme";

const UserCard = ({ user, onEdit, onDelete }) => {
  const { user: auth } = useSelector((state) => state.auth);
  const permissions = auth?.permissions || [];
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteClick = () => setDeleteOpen(true);
  const handleCloseDelete = () => setDeleteOpen(false);
  const handleConfirmDelete = () => {
    setDeleteOpen(false);
    onDelete(user.id);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        minHeight: 360,
        width: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
        background: theme.colors.innerCardBackground,
        "&:hover": {
          boxShadow: 7,
          transform: "scale(1.045)",
        },
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          width: "100%",
          px: 3,
          pt: 3,
          pb: 2,
          color: theme.colors.textLight,
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.colors.primary,
            width: 48,
            height: 48,
            mx: "auto",
            mb: 1,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {user.firstName?.[0]?.toUpperCase() || "U"}
        </Avatar>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ color: theme.colors.textLight }}
        >
          Name: {user.firstName} {user.lastName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
          sx={{ color: theme.colors.textLight }}
        >
          Username: {user.userName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
          sx={{ color: theme.colors.textLight }}
        >
          Session Timeout: {+user.sessionTimeOut / 60} minutes
        </Typography>
        <Box
          sx={{
            mt: 1,
            mb: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            maxHeight: 110,
            overflowY: "auto",
            justifyContent: "center",
          }}
        >
          {user.permissions?.length > 0 ? (
            user.permissions.map((perm, idx) => (
              <Chip
                key={idx}
                label={perm}
                size="small"
                sx={{
                  bgcolor: theme.colors.cardBackground,
                  color: theme.colors.textLight,
                  border: `1px solid ${theme.colors.inputBorder}`,
                  fontWeight: 500,
                  fontSize: 12,
                }}
              />
            ))
          ) : (
            <Chip label="No Permissions" size="small" color="warning" />
          )}
        </Box>        
        <Box display="flex" justifyContent="center" gap={1} mt={2}>
          {permissions.includes("Update Users") && (
            <Tooltip title="Edit">
              <IconButton color="primary" onClick={() => onEdit(user)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {permissions.includes("Delete Users") && (
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
          Are you sure you want to delete user "{user.firstName} {user.lastName}"?
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

export default UserCard;

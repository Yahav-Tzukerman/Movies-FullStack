import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import appTheme from "../styles/theme";
import { PERMISSIONS } from "../utils/userValidation";

const UserCard = ({ user, onEdit, onDelete }) => {
  const { user: auth } = useSelector((state) => state.auth);
  const permissions = auth?.permissions || [];
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        minHeight: 350,
        width: 330,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
        background: theme.colors.innerCardBackground,
        "&:hover": {
          boxShadow: 7,
          transform: "scale(1.035)",
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
            bgcolor: "primary.main",
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
          Session Timeout: {user.sessionTimeOut} minutes
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
          sx={{ color: theme.colors.textLight }}
        >
          PERMISSIONS: {user.permissions.join(", ") || "None"}
        </Typography>
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
              <IconButton color="error" onClick={() => onDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;

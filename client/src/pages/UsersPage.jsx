import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/PersonAdd";
import AppInput from "../components/common/AppInput";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";
import AppErrorPopApp from "../components/common/AppErrorPopApp";
import AppButton from "../components/common/AppButton";
import { useUsers } from "../hooks/useUsers";
import appTheme from "../styles/theme";

const UsersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const { users, loading, reload, deleteUser, error: dbError, setError: setDbError } = useUsers();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditUser(null);
    setModalOpen(true);
  };
  const handleEdit = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      reload();
      setPopup({
        show: true,
        message: "User deleted successfully",
        type: "success",
      });
    }).catch((error) => {
      setPopup({
        show: true,
        message: `Error deleting user: ${error.message}`,
        type: "error",
      });
    });
  };

  const handleModalSave = () => {
    setModalOpen(false);
    setEditUser(null);
    reload();
  };

  const handleCloseErrorPopup = () => {
    setPopup({ ...popup, show: false, message: "" });
    setDbError("");
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={5}>
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
            User Management
          </Typography>
          {user?.permissions?.includes("Create Users") && (
            <AppButton
              variant="primary"
              label={<AddIcon />}
              onClick={handleAdd}
            />
          )}
        </Box>
        <Box mb={2}>
          <AppInput
            label="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            fullWidth
          />
        </Box>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <UserCard
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <UserModal
        open={modalOpen}
        handleClose={handleCloseModal}
        editUser={editUser}
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

export default UsersPage;

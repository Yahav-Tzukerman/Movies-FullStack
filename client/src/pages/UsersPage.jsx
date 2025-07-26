import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Grid } from "@mui/material";
import UsersService from "../services/users.service";
import AddIcon from "@mui/icons-material/PersonAdd";
import AppInput from "../components/common/AppInput";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";
import AppErrorPopApp from "../components/common/AppErrorPopApp";
import AppButton from "../components/common/AppButton";
import appTheme from "../styles/theme";

const UsersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    UsersService.getAllUsers(token)
      .then((res) => {
        setUsers(res.data);
        console.log("Users loaded:", res.data);
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch users")
      );
  };

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
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      UsersService.deleteUser(id, token)
        .then(loadUsers)
        .catch((err) =>
          setError(err.response?.data?.message || "Failed to delete user")
        );
    }
  };

  const handleModalSave = () => {
    setModalOpen(false);
    loadUsers();
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
            User Management
          </Typography>
          <AppButton
            variant="primary"
            label={<AddIcon />}
            onClick={handleAdd}
          />
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
        <Grid container spacing={3}>
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
      <AppErrorPopApp message={error} onClose={() => setError("")} />
    </Box>
  );
};

export default UsersPage;

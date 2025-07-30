import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { useMembers } from "../hooks/useMembers";
import { useMovies } from "../hooks/useMovies";
import AddIcon from "@mui/icons-material/PersonAdd";
import MemberCard from "../components/MemberCard";
import MemberModal from "../components/MemberModal";
import AppErrorPopApp from "../components/common/AppErrorPopApp";
import AppButton from "../components/common/AppButton";
import appTheme from "../styles/theme";
import AppInput from "../components/common/AppInput";

const SubscriptionsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const {
    members,
    loading,
    reload,
    deleteMember,
    addMovieToSubscriptionByMember,
    error: dbError,
    setError: setDbError,
  } = useMembers();
  const { movies } = useMovies();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const filteredMembers = members.filter((member) =>
    member.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, [location.search]);

  const handleAdd = () => {
    setEditMember(null);
    setModalOpen(true);
  };
  const handleEdit = (member) => {
    setEditMember(member);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = (id) => {
    deleteMember(id)
      .then((isDeleted) => {
        reload();
        setPopup({
          show: true,
          message: isDeleted
            ? "Member deleted successfully"
            : "Failed to delete member",
          type: isDeleted ? "success" : "error",
        });
      })
      .catch((err) => {
        setPopup({
          show: true,
          message: `Error deleting member: ${err.message}`,
          type: "error",
        });
      });
  };

  const handleModalSave = () => {
    setModalOpen(false);
    setEditMember(null);
    reload();
  };

  const handleSubscribe = (memberId, movieId, date) => {
    addMovieToSubscriptionByMember(memberId, { movieId, date })
      .then((isSubscribed) => {
        reload();
        setPopup({
          show: true,
          message: isSubscribed
            ? "Member subscribed to movie successfully!"
            : "Failed to subscribe member to movie.",
          type: isSubscribed ? "success" : "error",
        });
      })
      .catch((err) => {
        setPopup({
          show: true,
          message:
            err.response?.data?.message ||
            "Failed to subscribe member to movie.",
          type: "error",
        });
      });
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
            Members & Subscriptions
          </Typography>
          {user?.permissions?.includes("Create Subscriptions") && (
            <AppButton
              variant="primary"
              label={<AddIcon />}
              onClick={handleAdd}
            />
          )}
        </Box>
        <Box mb={2}>
          <AppInput
            label="Search members"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by member name"
            fullWidth
          />
        </Box>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {filteredMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member._id}>
              <MemberCard
                member={member}
                allMovies={movies}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSubscribe={handleSubscribe}
                canSubscribe={user?.permissions?.includes(
                  "Create Subscriptions"
                )}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <MemberModal
        open={modalOpen}
        handleClose={handleCloseModal}
        editMember={editMember}
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

export default SubscriptionsPage;

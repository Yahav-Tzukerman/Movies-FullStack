import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Grid } from "@mui/material";
import MembersService from "../services/members.service";
import MoviesService from "../services/movies.service";
import AddIcon from "@mui/icons-material/PersonAdd";
import MemberCard from "../components/MemberCard";
import MemberModal from "../components/MemberModal";
import AppErrorPopApp from "../components/common/AppErrorPopApp";
import AppButton from "../components/common/AppButton";
import appTheme from "../styles/theme";

const SubscriptionsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  const [members, setMembers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMembers();
    loadMovies();
  }, []);

  const loadMembers = () => {
    MembersService.getAllMembers(token)
      .then((res) => setMembers(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch members")
      );
  };
  const loadMovies = () => {
    MoviesService.getAllMovies(token)
      .then((res) => setMovies(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch movies")
      );
  };

  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

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
    if (window.confirm("Are you sure you want to delete this member?")) {
      MembersService.deleteMember(id, token)
        .then(loadMembers)
        .catch((err) =>
          setError(err.response?.data?.message || "Failed to delete member")
        );
    }
  };

  const handleModalSave = () => {
    setModalOpen(false);
    loadMembers();
  };

  // הוספת מנוי חדש לסרט (subscription)
  const handleSubscribe = (memberId, movieId, date) => {
    MembersService.subscribeToMovie(memberId, movieId, date, token)
      .then(loadMembers)
      .catch((err) =>
        setError(
          err.response?.data?.message ||
            "Failed to subscribe to movie. Try again."
        )
      );
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={5}>
      <Paper elevation={4} sx={{ p: 4, background: theme.colors.cardBackground }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {filteredMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member._id}>
              <MemberCard
                member={member}
                allMovies={movies}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSubscribe={handleSubscribe}
                canSubscribe={user?.permissions?.includes("Create Subscriptions")}
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
      <AppErrorPopApp message={error} onClose={() => setError("")} />
    </Box>
  );
};

export default SubscriptionsPage;

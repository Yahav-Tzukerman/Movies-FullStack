import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { useMembers } from "../hooks/useMembers";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { useUsers } from "../hooks/useUsers";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import appTheme from "../styles/theme";

const cardData = [
  {
    key: "movies",
    label: "Movies",
    icon: <MovieIcon fontSize="large" color="primary" />,
    route: "/movies",
    color: "#fffbe6",
    permissions: "View Movies",
  },
  {
    key: "members",
    label: "Members",
    icon: <PeopleIcon fontSize="large" color="secondary" />,
    route: "/subscriptions",
    color: "#e6f7ff",
    permissions: "View Subscriptions",
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    icon: <GroupAddIcon fontSize="large" color="success" />,
    route: "/subscriptions",
    color: "#e6ffe6",
    permissions: "View Subscriptions",
  },
  {
    key: "users",
    label: "Users",
    icon: <PersonIcon fontSize="large" color="info" />,
    route: "/users",
    color: "#ece6ff",
    permissions: "View Users",
    adminOnly: true,
  },
];

const HomePage = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const { user } = useSelector((state) => state.auth);
  const { movies, loading: loadingMovies } = useMovies();
  const { members, loading: loadingMembers } = useMembers();
  const { subscriptions, loading: loadingSubs } = useSubscriptions();
  const { users, loading: loadingUsers } = useUsers();
  const navigate = useNavigate();
  const stats = {
    movies: movies.length,
    members: members.length,
    subscriptions: subscriptions.length,
    users: users.length,
  };

  const DASHBOARD_BG = app.darkMode
    ? "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
    : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: {},
        py: 8,
      }}
    >
      <Box maxWidth={800} mx="auto" mt={10} position="relative">
        <Paper
          elevation={5}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            mb: 5,
            opacity: 0.97,
            background: `linear-gradient(135deg, rgba(200,200,255,0.2), rgba(80,80,120,0.1)), url(${DASHBOARD_BG}) center/cover no-repeat`,
            py: 8,
          }}
        >
          <Box mb={2}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: theme.colors.primary,
                mx: "auto",
                boxShadow: 2,
                fontSize: 36,
              }}
            >
              <DashboardIcon fontSize="large" />
            </Avatar>
          </Box>
          <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: "black", fontWeight: "bold" }}>
            Welcome, {user?.firstName || user?.userName}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "black", fontWeight: "bold" }}>
            This is your personal dashboard.
            <br />
            {user?.permissions?.includes("View Users")
              ? "You can manage Movies, Members, Subscriptions, and Users."
              : "You can manage Movies and Subscriptions."}
          </Typography>
          <Grid container spacing={3} mt={2} justifyContent="center">
            {cardData
              .filter(
                (c) => !c.adminOnly || user?.permissions?.includes("View Users")
              )
              .map((card) => (
                <Grid item xs={12} sm={6} md={3} key={card.key}>
                  { user?.permissions?.includes(card.permissions) && (
                    <Card
                      onClick={() => navigate(card.route)}
                      sx={{
                        bgcolor: card.color,
                      minHeight: 160,
                      height: "100%",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.1s cubic-bezier(.2,0,.2,1)",
                      boxShadow: 3,
                      "&:hover": {
                        boxShadow: 8,
                        transform: "scale(1.02)",
                        border: `2px solid ${theme.colors.inputBorder}`,
                        background: "#f0f4ff",
                      },
                    }}
                    elevation={3}
                  >
                    <CardContent
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                      <Typography
                        variant="h6"
                        sx={{
                          mt: 1,
                          fontWeight: 500,
                        }}
                      >
                        {card.label}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          mt: 0.5,
                          fontWeight: 700,
                        }}
                      >
                        {stats[card.key]}
                      </Typography>
                    </CardContent>
                  </Card>
              )}  
                </Grid>
              ))}
          </Grid>
        </Paper>
        {(loadingMovies || loadingMembers || loadingSubs || loadingUsers) && (
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
    </Box>
  );
};

export default HomePage;

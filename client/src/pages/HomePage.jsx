import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoviesService from "../services/movies.service";
import MembersService from "../services/members.service";
import SubscriptionsService from "../services/subscriptions.service";
import UsersService from "../services/users.service";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";

const cardData = [
  {
    key: "movies",
    label: "Movies",
    icon: <MovieIcon fontSize="large" color="primary" />,
    route: "/movies",
    color: "#fffbe6",
  },
  {
    key: "members",
    label: "Members",
    icon: <PeopleIcon fontSize="large" color="secondary" />,
    route: "/members",
    color: "#e6f7ff",
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    icon: <GroupAddIcon fontSize="large" color="success" />,
    route: "/subscriptions",
    color: "#e6ffe6",
  },
  {
    key: "users",
    label: "Users",
    icon: <PersonIcon fontSize="large" color="info" />,
    route: "/users",
    color: "#ece6ff",
    adminOnly: true,
  },
];

const HomePage = () => {
  const appTheme = useSelector((state) => state.app);
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = user?.token || "";
  const [stats, setStats] = useState({
    movies: 0,
    members: 0,
    subscriptions: 0,
    users: 0,
  });

  const DASHBOARD_BG = appTheme.darkMode
    ? "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
    : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    MoviesService.getAllMovies(token).then((res) =>
      setStats((prev) => ({ ...prev, movies: res.data.length }))
    );
    MembersService.getAllMembers(token).then((res) =>
      setStats((prev) => ({ ...prev, members: res.data.length }))
    );
    SubscriptionsService.getAllSubscriptions(token).then((res) =>
      setStats((prev) => ({ ...prev, subscriptions: res.data.length }))
    );
    if (user?.permissions?.includes("View Users")) {
      UsersService.getAllUsers(token).then((res) =>
        setStats((prev) => ({ ...prev, users: res.data.length }))
      );
    }
  }, [token, user]);

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: `linear-gradient(135deg, rgba(200,200,255,0.2), rgba(80,80,120,0.1)), url(${DASHBOARD_BG}) center/cover no-repeat`,
        py: 8,
      }}
    >
      <Box maxWidth={800} mx="auto">
        <Paper
          elevation={5}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            mb: 5,
            opacity: 0.97,
          }}
        >
          <Box mb={2}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                mx: "auto",
                boxShadow: 2,
                fontSize: 36,
              }}
            >
              <DashboardIcon fontSize="large" />
            </Avatar>
          </Box>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Welcome, {user?.firstName || user?.userName}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
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
                  <Card
                    onClick={() => navigate(card.route)}
                    sx={{
                      bgcolor: appTheme.darkMode
                        ? theme.palette.background.paper
                        : card.color,
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
                        border: `2px solid ${theme.palette.primary.main}`,
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
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;

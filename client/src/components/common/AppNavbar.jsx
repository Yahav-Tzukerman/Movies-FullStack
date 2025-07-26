import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppThemeToggle from "./AppThemeToggle";
import appTheme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const AppNavbar = ({ handleLogout }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        background: theme.colors.gradientBackground,
        color: theme.colors.textLight,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: theme.colors.textLight,
              display: { xs: "none", lg: "block" },
              mr: 2,
            }}
          >
            Cinema Subscriber
            {isAuthenticated && (
              <Typography
                variant="h6"
                sx={{
                  textDecoration: "none",
                  color: theme.colors.textLight,
                }}
              >
                Hello, {user?.firstName + " " + user?.lastName}!
              </Typography>
            )}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {isAuthenticated && (
            <>
              <Button
                component={Link}
                to="/movies"
                sx={{ color: theme.colors.textLight, textTransform: "none" }}
              >
                Movies
              </Button>
              <Button
                component={Link}
                to="/subscriptions"
                sx={{ color: theme.colors.textLight, textTransform: "none" }}
              >
                Subscriptions
              </Button>
              {user?.permissions.includes("View Users") && (
                <>
                  <Button
                    component={Link}
                    to="/users"
                    sx={{
                      color: theme.colors.textLight,
                      textTransform: "none",
                    }}
                  >
                    Users Management
                  </Button>
                </>
              )}
              <Button
                onClick={handleLogout}
                sx={{ color: theme.colors.textLight, textTransform: "none" }}
              >
                Logout
              </Button>
              <IconButton
                onClick={handleLogout}
                sx={{ color: theme.colors.textLight }}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </IconButton>
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AppThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;

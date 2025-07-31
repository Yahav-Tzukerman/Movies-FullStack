import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppThemeToggle from "./AppThemeToggle";
import appTheme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import MenuIcon from "@mui/icons-material/Menu";
import CinemaAppIcon from "./CinemaAppIcon";

const AppNavbar = ({ handleLogout }) => {
  const app = useSelector((state) => state.app);
  const themeMui = useTheme();
  const isMobile = useMediaQuery(themeMui.breakpoints.down("md"));
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <AppBar
      position="static"
      sx={{
        width: "100vw",
        background: theme.colors.gradientBackground,
        color: theme.colors.textLight,
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        {!isMobile ? (
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
            <CinemaAppIcon size={48} color="#ff6f00" />
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
        ) : null}

        {isMobile && isAuthenticated ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  background: theme.colors.gradientBackground,
                  color: theme.colors.textLight,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textDecoration: "none",
                  color: theme.colors.textLight,
                  padding: 2,
                }}
              >
                <CinemaAppIcon size={48} color="#ff6f00" />
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
              <Box width={220}>
                <List>
                  {user?.permissions.includes("View Movies") && (
                    <ListItem
                      button
                      component={Link}
                      to="/movies"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary="Movies" />
                    </ListItem>
                  )}
                  {user?.permissions.includes("View Subscriptions") && (
                    <ListItem
                      button
                      component={Link}
                      to="/subscriptions"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary="Subscriptions" />
                    </ListItem>
                  )}
                  {user?.permissions.includes("View Users") && (
                    <ListItem
                      button
                      component={Link}
                      to="/users"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary="Users Management" />
                    </ListItem>
                  )}
                  {isAuthenticated && (
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            {isAuthenticated && (
              <>
                {user?.permissions.includes("View Movies") && (
                  <Button
                    component={Link}
                    to="/movies"
                    sx={{
                      color: theme.colors.textLight,
                      textTransform: "none",
                    }}
                  >
                    Movies
                  </Button>
                )}
                {user?.permissions.includes("View Subscriptions") && (
                  <Button
                    component={Link}
                    to="/subscriptions"
                    sx={{
                      color: theme.colors.textLight,
                      textTransform: "none",
                    }}
                  >
                    Subscriptions
                  </Button>
                )}
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
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AppThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;

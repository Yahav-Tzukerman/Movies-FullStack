import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { Container } from "@mui/material";
import AppNavbar from "./components/common/AppNavbar";
import { useSelector, useDispatch } from "react-redux";
import appTheme from "./styles/theme";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "./services/axiosConfig";
import WakeServersSpinner from "./components/common/WakeServersSpinner";

const App = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [serversReady, setServersReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "auth/initializeAuth" });
    setupAxiosInterceptors();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: "auth/clearUser" });
    navigate("/signin");
  };

  if (!serversReady && import.meta.env.VITE_ENVIRONMENT === "production")
    return <WakeServersSpinner onDone={() => setServersReady(true)} />;

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        minHeight: "100vh",
        background: theme.colors.gradientBackground,
        color: theme.colors.textLight,
        fontFamily: theme.colors.fontFamily,
        px: { xs: 0, sm: 2, md: 3 },
        boxSizing: "border-box",
      }}
    >
      <AppNavbar handleLogout={handleLogout} />
      <AppRouter />
    </Container>
  );
};

export default App;

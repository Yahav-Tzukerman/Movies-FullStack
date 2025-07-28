import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import { Container } from "react-bootstrap";
import AppNavbar from "./components/common/AppNavbar";
import { useSelector, useDispatch } from "react-redux";
import appTheme from "./styles/theme";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "./services/axiosConfig";

const App = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
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

  return (
    <Container
      fluid
      style={{
        background: theme.colors.gradientBackground,
        color: theme.colors.textLight,
        fontFamily: theme.colors.fontFamily,
        minHeight: "100vh",
      }}
    >
      <AppNavbar handleLogout={handleLogout} />
      <AppRouter />
    </Container>
  );
};

export default App;

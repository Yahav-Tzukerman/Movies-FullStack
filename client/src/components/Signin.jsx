import React, { useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { validateUsername, validatePassword } from "../utils/regexValidations";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import AppInput from "./common/AppInput";
import appTheme from "../styles/theme";
import AppButton from "./common/AppButton";
import AppCheckbox from "./common/AppCheckBox";
import AppErrorPopup from "./common/AppErrorPopApp";
import authService from "../services/auth.service";

const SignInComp = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [rememberMe, setRememberMe] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      if (!validateUsername(username)) {
        setErrors((prev) => [...prev, "username"]);
        createErrorMessage();
        return;
      }
      if (!validatePassword(password)) {
        setErrors((prev) => [...prev, "password"]);
        createErrorMessage();
        return;
      }
      const response = await authService.login(username, password);

      console.log("Login response:", response);

      if (response.error) {
        setPopup({
          ...popup,
          message: response.error,
          type: "error",
          show: true,
        });
        return;
      }

      const token = response.data.token;

      const userData = {
        ...response.data,
        token: token,
      };

      dispatch(setUser(userData));

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setPopup({
        ...popup,
        message: err.response?.data?.message || "An error occurred",
        type: "error",
        show: true,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    if (validateUsername(e.target.value)) {
      setErrors(errors.filter((err) => err !== "username"));
    } else {
      setErrors([...errors, "username"]);
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    if (validatePassword(e.target.value)) {
      setErrors(errors.filter((err) => err !== "password"));
    } else {
      setErrors([...errors, "password"]);
    }
  };

  const handleCloseErrorPopup = () => {
    setPopup({ ...popup, show: false, message: "" });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <AppErrorPopup
          show={popup.show}
          label={popup.message}
          handleClose={handleCloseErrorPopup}
          variant={popup.type}
        />
        <Card
          sx={{
            backgroundColor: theme.colors.cardBackground,
            color: theme.colors.textLight,
            fontFamily: theme.fontFamily,
            width: "100%",
            minHeight: "50vh",
            p: 2,
            border: ".5px solid black",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mb: 2, mt: 1, color: theme.colors.textLight }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
                if (e.key === "Escape") handleCloseErrorPopup(e);
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <AppInput
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={onUsernameChange}
                  error={errors.includes("username")}
                  errorMessage="Username is invalid"
                  instructions="Username must meet requirements."
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 1 }}>
                <AppInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={onPasswordChange}
                  error={errors.includes("password")}
                  errorMessage="Password is invalid"
                  instructions="Password must meet requirements."
                />
              </Grid>

              <FormControlLabel
                control={
                  <AppCheckbox
                    checked={rememberMe}
                    label={"Remember me"}
                    onChange={() => setRememberMe(!rememberMe)}
                    sx={{ color: theme.colors.primary }}
                  />
                }
                sx={{ mt: 2, color: theme.colors.textLight }}
              />
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <AppButton
                  label="Sign In"
                  type="submit"
                  size={"lg"}
                  variant="primary"
                  fullWidth
                  onClick={handleSubmit}
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textLight }}
                >
                  Don't have an account?
                  <Link
                    to="/signup"
                    style={{
                      color: theme.colors.primary,
                      textDecoration: "none",
                      fontWeight: "bold",
                      marginLeft: "4px",
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SignInComp;

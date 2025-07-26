import React, { useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Collapse,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validateUsername, validatePassword } from "../utils/regexValidations";
import appTheme from "../styles/theme";
import authService from "../services/auth.service";
import AppInput from "./common/AppInput";
import AppButton from "./common/AppButton";
import AppErrorPopup from "./common/AppErrorPopApp";

const SignupComp = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const createErrorMessage = () => {
    const errorList =
      error.length > 0
        ? error.map((err, index) => <li key={index}>{err}</li>)
        : [];

    setPopup({
      ...popup,
      message: (
        <>
          <ul>
            Fix The Following Fields:
            {errorList}
          </ul>
        </>
      ),
      type: "error",
      show: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error.length > 0 || !formData.username || !formData.password) {
      createErrorMessage();
      return;
    }

    try {
      const response = await authService.createAccount(
        formData.username,
        formData.password
      );
      setPopup({
        ...popup,
        message: "User Created Successfully",
        type: "success",
        show: true,
      });

      setFormData({
        username: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      setPopup({
        ...popup,
        message: error?.response?.data?.message,
        type: "error",
        show: true,
      });
    }
  };

  const onUsernameChange = (e) => {
    setFormData({ ...formData, username: e.target.value });
    if (validateUsername(e.target.value)) {
      setError((prevErrors) => prevErrors.filter((err) => err !== "Username"));
    } else {
      if (!error.includes("Username")) {
        setError((prevErrors) => [...prevErrors, "Username"]);
      }
    }
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    if (validatePassword(e.target.value)) {
      setError((prevErrors) => prevErrors.filter((err) => err !== "password"));
    } else {
      if (!error.includes("password")) {
        setError((prevErrors) => [...prevErrors, "password"]);
      }
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
              Sign Up
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
                  value={formData.username}
                  onChange={onUsernameChange}
                  error={error.includes("username")}
                  errorMessage="Username is invalid. Should be at least 6 characters."
                  instructions="Username must be at least 6 characters long."
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 1 }}>
                <AppInput
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onPasswordChange}
                  error={error.includes("password")}
                  errorMessage="Password is invalid. Should be at least 8 characters and contain uppercase, lowercase, number, and special character."
                  instructions="Password must meet requirements."
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <AppButton
                  label="Sign Up"
                  variant="primary"
                  onClick={handleSubmit}
                  size={"lg"}
                  fullWidth
                  type="submit"
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textLight }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    style={{
                      color: theme.colors.primary,
                      textDecoration: "none",
                      fontWeight: "bold",
                      marginLeft: "4px",
                    }}
                  >
                    Sign In
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

export default SignupComp;

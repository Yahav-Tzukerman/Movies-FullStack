import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppButton from "../components/common/AppButton";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Box sx={{ mt: "25vh" }}>
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you are looking for does not exist.
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <AppButton
            label="Return Home"
            variant="secondary"
            onClick={handleLogout}
          />
        </Grid>
      </Box>
    </Container>
  );
};

export default PageNotFound;

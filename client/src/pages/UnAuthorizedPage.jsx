import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppButton from "../components/common/AppButton";

const UnAuthorizedPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Box sx={{ mt: "25vh" }}>
        <Typography variant="h1" gutterBottom>
          403
        </Typography>
        <Typography variant="h4" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" gutterBottom>
          You do not have permission to view this page.
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

export default UnAuthorizedPage;

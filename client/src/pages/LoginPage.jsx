import React from "react";
import { Box, Container } from "@mui/material";
import SignInComp from "../components/Signin";

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <SignInComp />
      </Box>
    </Container>
  );
};

export default LoginPage;

import React from "react";
import { Container, Box } from "@mui/material";
import SignupComp from "../components/Signup";

const SignupPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box width="100%">
        <SignupComp />
      </Box>
    </Container>
  );
};

export default SignupPage;

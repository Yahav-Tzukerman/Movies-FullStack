import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SignInComp from "../components/Signin";

const LoginPage = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <SignInComp />
    </Container>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SignupComp from "../components/Signup";

const SignupPage = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <SignupComp />
    </Container>
  );
};

export default SignupPage;

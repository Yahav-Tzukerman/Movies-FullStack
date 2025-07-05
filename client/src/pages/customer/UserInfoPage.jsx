import React from "react";
import { Container } from "react-bootstrap";
import UserInfoComp from "../../components/customer/UserInfo";
const UserInfoPage = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <UserInfoComp />
    </Container>
  );
};

export default UserInfoPage;

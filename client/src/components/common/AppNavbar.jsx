import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppThemeToggle from "./AppThemeToggle";
import appTheme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import usersService from "../../services/users.service";

const AppNavbar = ({ handleLogout }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(); // Validate token
        const { data: roleFromFireBase } = await usersService.getUserRole(
          auth.currentUser.uid
        );
        if (user?.token === token && user?.role === roleFromFireBase) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    };

    validateToken();
  }, [user, loading]);

  return (
    <Navbar
      bg={theme.colors.gradientBackground}
      variant={app.darkMode ? "dark" : "light"}
      expand="lg"
      style={{
        width: "100%",
        background: theme.colors.gradientBackground,
      }}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="/" className="d-none d-lg-block">
          Next Generation E-Commerce {isValid}
        </Navbar.Brand>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
          style={{ width: "100%", marginRight: "13rem" }}
        >
          {user?.role === "admin" && (
            <Nav className="mx-auto" style={{ gap: "0.5rem" }}>
              <Nav.Link
                as={Link}
                to="/admin/categories"
                style={{ color: "grey", textDecoration: "none" }}
              >
                Categories
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/admin/products"
                style={{ color: "grey", textDecoration: "none" }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/admin/customers"
                style={{ color: "grey", textDecoration: "none" }}
              >
                Customers
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/admin/statistics"
                style={{ color: "grey", textDecoration: "none" }}
              >
                Statistics
              </Nav.Link>
            </Nav>
          )}
          {user?.role === "customer" && (
            <Nav className="mx-auto" style={{ gap: "0.5rem" }}>
              <Nav.Link
                as={Link}
                to="/customer/products"
                style={{ color: "grey", textDecoration: "none" }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/customer/orders"
                style={{ color: "grey", textDecoration: "none" }}
              >
                My Orders
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/customer/account"
                style={{ color: "grey", textDecoration: "none" }}
              >
                My Account
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                style={{ color: "grey", textDecoration: "none" }}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
        {isAuthenticated && (
          <FontAwesomeIcon
            onClick={handleLogout}
            icon={faArrowRightFromBracket}
            style={{
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.colors.text,
            }}
          />
        )}
        <AppThemeToggle />
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

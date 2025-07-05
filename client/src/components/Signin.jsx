import React, { useState } from "react";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import AppButton from "./common/AppButton";
import AppInput from "./common/AppInput";
import AppLabel from "./common/AppLabel";
import AppCheckbox from "./common/AppCheckBox";
import { Link } from "react-router-dom";
import { validateUsername, validatePassword } from "../utils/regexValidations";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../services/users.service";
import { setLoading, setUser } from "../redux/authSlice";
import appTheme from "../styles/theme";
import { auth } from "../firebase/firebase";
import AppErrorPopUp from "../components/common/AppErrorPopApp";

const SignInComp = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true)); // Start loading state
    try {
      const response = await UserService.login(username, password);

      if (response.error) {
        setPopup({
          ...popup,
          message: response.error,
          type: "error",
          show: true,
          variant: "error",
        });
        return;
      }

      const token = await auth.currentUser.getIdToken(); // Get Firebase token

      const userData = {
        ...response.data,
        token: token,
      };

      dispatch(setUser(userData));

      // Navigate based on role
      if (response.data.role === "admin") {
        navigate("/admin/categories");
      } else if (response.data.role === "customer") {
        navigate("/customer/products");
      } else {
        navigate("/");
      }
    } catch (err) {
      setPopup({
        ...popup,
        message: err.message,
        type: "error",
        show: true,
        variant: "error",
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
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {popup.show && (
        <AppErrorPopUp
          handleClose={handleCloseErrorPopup}
          show={popup.show}
          label={popup.message}
          variant={popup.type}
        />
      )}
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card
            style={{
              backgroundColor: theme.colors.cardBackground,
              color: theme.colors.textLight,
              fontFamily: theme.fontFamily,
              width: "100%",
              minHeight: "50vh",
              padding: "0.2rem",
              border: ".5px solid black",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body>
              <Card.Title
                style={{ fontSize: "2rem", fontWeight: "bold", margin: "3px" }}
              >
                Sign in
              </Card.Title>
              <Form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  e.key === "Enter" ? handleSubmit(e) : null;
                  e.key === "Escape" ? null : null;
                }}
              >
                <Form.Group
                  style={{ marginTop: "4vh" }}
                  controlId="formBasicUsername"
                >
                  <AppLabel text="username" />
                  <AppInput
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={onUsernameChange}
                    error={
                      errors.filter((err) => err === "username").length > 0
                    }
                    errorMessage="Username is invalid"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <AppLabel text="Password" />
                  <AppInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onPasswordChange}
                    error={
                      errors.filter((err) => err === "password").length > 0
                    }
                    errorMessage="Password is invalid"
                  />
                </Form.Group>

                <Form.Group
                  controlId="formBasicCheckbox"
                  style={{ marginTop: "3vh" }}
                >
                  <AppCheckbox
                    label="Remember me"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => {
                      setRememberMe(!rememberMe);
                    }}
                  />
                </Form.Group>

                <div style={{ marginTop: "3vh" }}>
                  <AppButton label="Sign In" onClick={handleSubmit} />
                </div>

                <div style={{ marginTop: "3vh", textAlign: "center" }}>
                  <p style={{ color: theme.colors.textLight }}>
                    Don't have an account?
                    <Link
                      to="/signup"
                      style={{
                        color: theme.colors.primary,
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInComp;

import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../common/AppButton";
import AppInput from "../common/AppInput";
import AppLabel from "../common/AppLabel";
import AppCheckbox from "../common/AppCheckBox";
import { Link } from "react-router-dom";
import {
  validateUsername,
  validatePassword,
  validateFiled,
} from "../../utils/regexValidations";
import UserService from "../../services/users.service";
import { serverTimestamp } from "firebase/firestore";
import AppErrorPopUp from "../common/AppErrorPopApp";
import { useNavigate } from "react-router-dom";
import appTheme from "../../styles/theme";
import useUsers from "../../hooks/useUsers";

const UserInfoComp = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const userId = useSelector((state) => state.auth.user.userId);
  const user = useUsers().filter((user) => user.id === userId)[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        password: "",
        confirmPassword: "",
        agreeTerms: user.agreeTerms || false,
      });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
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

    // Basic validation check
    if (
      error.length > 0 ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      createErrorMessage();
      return;
    }

    const user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      agreeTerms: formData.agreeTerms,
      updatedAt: serverTimestamp(),
      isActive: true,
    };

    const response = await UserService.updateUser(userId, user);

    if (response?.error) {
      // If error is "User already exists"
      if (response.error === "User already exists") {
        if (!error.includes("Username")) {
          setError((prevErrors) => [...prevErrors, "Username"]);
        }
      }

      setPopup({
        ...popup,
        message: response.error,
        type: "error",
        show: true,
        variant: "error",
      });
      return;
    }

    // Success
    setPopup({
      ...popup,
      message: "User Updated Successfully",
      type: "success",
      show: true,
    });

    // dispatch({ type: "CLEAR_CART" });
    // dispatch({ type: "auth/clearUser" });
    // navigate("/signin");
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

  const onConfirmPasswordChange = (e) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
    if (e.target.value === formData.password) {
      setError((prevErrors) =>
        prevErrors.filter((err) => err !== "confirmPassword")
      );
    } else {
      if (!error.includes("confirmPassword")) {
        setError((prevErrors) => [...prevErrors, "confirmPassword"]);
      }
    }
  };

  const onFirstNameChange = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
    if (e.target.value.length < 2) {
      if (!error.includes("FirstName")) {
        setError((prevErrors) => [...prevErrors, "FirstName"]);
      }
    } else {
      setError((prevErrors) => prevErrors.filter((err) => err !== "FirstName"));
    }
  };

  const onLastNameChange = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
    if (e.target.value.length < 2) {
      if (!error.includes("LastName")) {
        setError((prevErrors) => [...prevErrors, "LastName"]);
      }
    } else {
      setError((prevErrors) => prevErrors.filter((err) => err !== "LastName"));
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
              minHeight: "60vh",
              padding: "0.2rem",
              border: ".5px solid black",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: "3px",
                }}
              >
                My Account
              </Card.Title>
              <Form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  e.key === "Enter" ? handleSubmit(e) : null;
                  e.key === "Escape" ? handleCloseErrorPopup(e) : null;
                }}
              >
                <Form.Group
                  controlId="formBasicFirstName"
                  style={{ marginTop: "4vh" }}
                >
                  <AppLabel text="First Name" />
                  <AppInput
                    type="text"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={onFirstNameChange}
                    error={error.includes("FirstName")}
                    errorMessage="First Name is invalid"
                    instructions="First Name should be at least 2 characters long"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <AppLabel text="Last Name" />
                  <AppInput
                    type="text"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={onLastNameChange}
                    error={error.includes("LastName")}
                    errorMessage="Last Name is invalid"
                    instructions="Last Name should be at least 2 characters long"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                  <AppLabel text="Username" />
                  <AppInput
                    type="text"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={onUsernameChange}
                    error={error.includes("Username")}
                    errorMessage="Username is invalid"
                    instructions="Username should be at least 6 characters long"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <AppLabel text="Password" />
                  <AppInput
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onPasswordChange}
                    error={error.includes("password")}
                    errorMessage="Password is invalid"
                    instructions="Password should be at least 8 characters long and contain uppercase, lowercase, number, and special character"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                  <AppLabel text="Confirm Password" />
                  <AppInput
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={onConfirmPasswordChange}
                    error={error.includes("confirmPassword")}
                    errorMessage="Passwords do not match"
                  />
                </Form.Group>

                <Form.Group
                  controlId="formBasicCheckbox"
                  style={{ marginTop: "3vh" }}
                >
                  <AppCheckbox
                    label="Allow others to see my orders"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={() => {
                      setFormData({
                        ...formData,
                        agreeTerms: !formData.agreeTerms,
                      });
                    }}
                  />
                </Form.Group>

                <div style={{ marginTop: "3vh" }}>
                  <AppButton label="Update Info" onClick={handleSubmit} />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfoComp;

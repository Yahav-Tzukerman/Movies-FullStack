import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import appTheme from "../../styles/theme";

const AppThemeToggle = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  const handleThemeToggle = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <Form className="ml-auto" style={{ position: "relative" }}>
      <Form.Check
        type="switch"
        id="theme-switch"
        onChange={handleThemeToggle}
        checked={app.darkMode}
        label=""
        style={{
          paddingLeft: "4.4rem",
          paddingRight: "1.2rem",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: "0.4rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: theme.colors.textLight,
        }}
      >
        <FontAwesomeIcon
          icon={faSun}
          style={{ visibility: app.darkMode ? "hidden" : "visible" }}
        />
      </span>
      <span
        style={{
          position: "absolute",
          right: "0.4rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: theme.colors.textLight,
        }}
      >
        <FontAwesomeIcon
          icon={faMoon}
          style={{ visibility: app.darkMode ? "visible" : "hidden" }}
        />
      </span>
    </Form>
  );
};

export default AppThemeToggle;

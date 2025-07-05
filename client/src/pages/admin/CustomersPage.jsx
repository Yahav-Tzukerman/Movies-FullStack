import React from "react";
import CustomerTableComp from "../../components/admin/CustomerTable";
import appTheme from "../../styles/theme";
import { useSelector } from "react-redux";

const CustomersPage = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    background: theme.colors.gradientBackground,
    color: theme.colors.textLight,
    fontFamily: theme.fontFamily,
  };

  const headerStyle = {
    margin: "3rem 0",
    textAlign: "center",
  };

  const contentStyle = {
    width: "90%",
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Customers</h1>
      <div style={contentStyle}>
        <CustomerTableComp />
      </div>
    </div>
  );
};

export default CustomersPage;

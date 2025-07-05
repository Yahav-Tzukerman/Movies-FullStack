import React from "react";
import OrdersTableComp from "../../components/customer/OrdersTable";
import appTheme from "../../styles/theme";
import { useSelector } from "react-redux";

const OrdersPage = () => {
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

  const tableContainerStyle = {
    width: "90%",
    maxHeight: "60vh",
    overflow: "auto",
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Orders</h1>
      <div style={tableContainerStyle}>
        <OrdersTableComp />
      </div>
    </div>
  );
};

export default OrdersPage;

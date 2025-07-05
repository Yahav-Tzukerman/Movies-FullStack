import React from "react";
import appTheme from "../../styles/theme";
import { useSelector } from "react-redux";
import Statistics from "../../components/admin/Statistics";

const StatisticsPage = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.colors.gradientBackground,
    color: theme.colors.textLight,
    fontFamily: theme.fontFamily,
  };

  const contentStyle = {
    width: "90%",
  };

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <Statistics />
      </div>
    </div>
  );
};

export default StatisticsPage;

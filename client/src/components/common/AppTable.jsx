import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import appTheme from "../../styles/theme";

const AppTable = ({ columns, data }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        bgcolor: theme.table.rowBackground,
        color: theme.colors.textLight,
        borderColor: theme.table.borderColor,
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          "& th": {
            color: theme.table.headerTextColor,
            borderColor: theme.table.borderColor,
            textAlign: "center",
            verticalAlign: "middle",
            position: "sticky",
            top: 0,
            zIndex: 1,
            bgcolor: theme.table.headerBackground || "inherit",
          },
          "& td": {
            color: theme.colors.textLight,
            borderColor: theme.table.borderColor,
            textAlign: "center",
            verticalAlign: "middle",
            bgcolor: theme.table.rowBackground,
          },
        }}
        aria-label="app table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column.accessor]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;

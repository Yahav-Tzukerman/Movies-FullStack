import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Slider, Button, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";
import AppComboBox from "./AppComboBox";
import AppInput from "./AppInput";

const ItemFilter = ({
  categories = ["All"],
  maxPrice = 500,
  onFilterChange,
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(maxPrice);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ category, price, title });
    }
  }, [category, price, title, onFilterChange]);

  const handleClear = () => {
    setCategory("All");
    setPrice(maxPrice);
    setTitle("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        my: 3,
        p: 4,
        backgroundColor: theme.colors.cardBackground,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid
        container
        alignItems="center"
        spacing={3}
        justifyContent="space-around"
      >
        {/* Category Filter */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontSize: "0.9rem",
                color: theme.colors.textMuted,
              }}
            >
              Filter by Category:
            </Typography>
            <AppComboBox
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categories}
            />
          </Box>
        </Grid>

        {/* Price Filter */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontSize: "0.9rem",
                color: theme.colors.textMuted,
              }}
            >
              Price:
            </Typography>
            <Box display="flex" alignItems="center">
              <Slider
                min={0}
                max={maxPrice}
                value={price}
                onChange={(_, val) => setPrice(Number(val))}
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  color: theme.colors.inputBackground,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.9rem",
                  color: theme.colors.textLight,
                }}
              >
                ${price}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Title Filter */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontSize: "0.9rem",
                color: theme.colors.textMuted,
              }}
            >
              Title:
            </Typography>
            <AppInput
              type="text"
              placeholder="Search title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={false}
            />
          </Box>
        </Grid>

        {/* Clear Button */}
        <Grid item xs={1} sm={1} lg={1} sx={{ textAlign: "end" }}>
          <Button
            onClick={handleClear}
            variant="contained"
            size="small"
            sx={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemFilter;

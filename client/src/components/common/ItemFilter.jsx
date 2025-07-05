import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";
import AppComboBox from "./AppComboBox";
import AppInput from "./AppInput";
import AppButton from "./AppButton";

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

  // Whenever filters change, notify parent
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
    <Container
      fluid
      className="my-3 p-4"
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row
        className="align-items-center g-3"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* Category Filter */}
        <Col xs={12} sm={6} lg={3}>
          <div className="d-flex flex-column">
            <label
              className="mb-1"
              style={{
                fontSize: "0.9rem",
                color: theme.colors.textMuted,
              }}
            >
              Filter by Category:
            </label>
            <AppComboBox
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categories}
            />
          </div>
        </Col>

        {/* Price Filter */}
        <Col xs={12} sm={6} lg={3}>
          <div className="d-flex flex-column">
            <label
              className="mb-1"
              style={{
                fontSize: "0.9rem",
                color: theme.colors.textMuted,
              }}
            >
              Price:
            </label>
            <div className="d-flex align-items-center">
              <Form.Range
                min={0}
                max={maxPrice}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={{
                  flexGrow: 1,
                  marginRight: "10px",
                  backgroundColor: theme.colors.inputBackground,
                }}
              />
              <span
                style={{
                  fontSize: "0.9rem",
                  color: theme.colors.textLight,
                }}
              >
                ${price}
              </span>
            </div>
          </div>
        </Col>

        {/* Title Filter */}
        <Col xs={12} sm={6} lg={3}>
          <div className="d-flex flex-column">
            <label
              className="mb-1"
              style={{
                fontSize: "0.9rem",
                color: theme.colors.textMuted,
              }}
            >
              Title:
            </label>
            <AppInput
              type="text"
              placeholder="Search title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={false}
            />
          </div>
        </Col>

        {/* Clear Button */}
        <Col xs={1} sm={1} lg={1} className="text-end">
          <AppButton
            label="Clear"
            onClick={handleClear}
            variant="primary"
            size="sm"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemFilter;

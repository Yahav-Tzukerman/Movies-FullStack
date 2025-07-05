import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import AppButton from "../common/AppButton";
import AppInput from "../common/AppInput";
import CategoryService from "../../services/categories.service";
import appTheme from "../../styles/theme";

const CategoryCard = ({ category, showPopup }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState(category.category);

  const cardStyle = {
    backgroundColor: theme.colors.cardBackground,
    color: theme.colors.textLight,
    fontFamily: theme.fontFamily,
    border: ".5px solid black",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "1rem",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    CategoryService.updateCategory(category.id, newCategory);
    setNewCategory("");
    setIsEditing(false);
    showPopup("Category updated successfully!", "success");
  };

  const handleDeleteClick = () => {
    CategoryService.deleteCategory(category.id);
    showPopup("Category deleted successfully!", "success");
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={8} lg={8}>
            {isEditing ? (
              <AppInput
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            ) : (
              <Card.Title style={titleStyle}>{category.category}</Card.Title>
            )}
          </Col>
          <Col
            xs={12}
            md={4}
            lg={4}
            className="d-flex justify-content-end mt-3 mt-md-0"
            style={{ gap: "1rem" }}
          >
            {isEditing ? (
              <>
                <AppButton
                  label="Save Update"
                  onClick={handleSaveClick}
                  disabled={false}
                  variant="update"
                />
                <AppButton
                  label="Cancel update"
                  onClick={() => setIsEditing(false)}
                  disabled={false}
                  variant="error"
                />
              </>
            ) : (
              <>
                <AppButton
                  label="Update"
                  onClick={handleUpdateClick}
                  disabled={false}
                  variant="update"
                  className="me-2"
                />
                <AppButton
                  label="Delete"
                  onClick={handleDeleteClick}
                  disabled={false}
                  variant="error"
                />
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;

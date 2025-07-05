import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import CategoriesService from "../../services/categories.service";
import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import appTheme from "../../styles/theme";
import AppErrorPopApp from "../common/AppErrorPopApp";

const CategoriesList = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    const unsubscribe = CategoriesService.getCategories((categoriesData) => {
      setCategories(categoriesData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddCategory = () => {
    const addCategory = {
      category: newCategory,
    };
    CategoriesService.addCategory(addCategory);
    showPopup("Category added successfully!", "success");
    setNewCategory("");
  };

  const showPopup = (message, type) => {
    setPopup({
      show: true,
      message,
      type,
    });
  };

  const handleClosePopup = () => {
    setPopup({
      ...popup,
      show: false,
      message: "",
    });
  };

  return (
    <Container style={{ marginTop: "2rem", position: "relative" }}>
      {popup.show && (
        <AppErrorPopApp
          handleClose={handleClosePopup}
          show={popup.show}
          label={popup.message}
          variant={popup.type}
        />
      )}
      <Row>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.colors.cardBackground,
            color: theme.colors.textLight,
            fontFamily: theme.fontFamily,
            width: "100%",
            minHeight: "80vh",
            padding: "2rem",
            border: ".5px solid black",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginTop: "1rem",
          }}
        >
          <h1 style={{ textAlign: "center", margin: "1rem" }}>Categories</h1>
          <div style={{ flex: 1, overflowY: "auto", maxHeight: "60vh" }}>
            {categories.map((category) => (
              <Col key={category.id} sm={3} md={12} lg={12}>
                <CategoryCard category={category} showPopup={showPopup} />
              </Col>
            ))}
          </div>
          <Row style={{ marginTop: "1rem" }}>
            <Col xs={9}>
              <AppInput
                placeholder="Add a new category"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
              />
            </Col>
            <Col xs={12} sm={3}>
              <AppButton label="Add Category" onClick={handleAddCategory} />
            </Col>
          </Row>
        </Card>
      </Row>
    </Container>
  );
};

export default CategoriesList;

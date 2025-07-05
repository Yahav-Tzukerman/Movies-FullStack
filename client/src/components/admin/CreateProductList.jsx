import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import AppButton from "../common/AppButton";
import appTheme from "../../styles/theme";
import CreateProductCard from "./CreateProductCard";
import productsService from "../../services/products.service";
import AppErrorPopApp from "../common/AppErrorPopApp";

const CreateProductListComp = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    imageUrl: "",
    description: "",
  });
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    const unsubscribe = productsService.getProducts((productsData) => {
      setProducts(productsData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddProduct = () => {
    const addProduct = {
      product: newProduct,
    };
    products.find((product) => product.id === addProduct.id)
      ? null
      : setProducts([addProduct, ...products]);
    setNewProduct({
      title: "",
      price: "",
      category: "",
      imageUrl: "",
      description: "",
    });
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: theme.colors.textLight,
            fontFamily: theme.fontFamily,
            width: "100%",
            minHeight: "80vh",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", maxHeight: "80vh" }}>
            {products.map((product, index) => (
              <Col key={product.id || index} sm={12} md={12} lg={12}>
                <CreateProductCard product={product} showPopup={showPopup} />
              </Col>
            ))}
          </div>
          <Row style={{ marginTop: "1rem" }}>
            <Col xs={4}>
              <AppButton
                variant="success"
                label="Add New Product"
                onClick={handleAddProduct}
              />
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default CreateProductListComp;

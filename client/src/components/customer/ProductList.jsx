import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";
import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts";
import ItemFilter from "../common/ItemFilter";
import useCategories from "../../hooks/useCategories";

const ProductList = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [filters, setFilters] = useState({
    category: "All",
    price: 500,
    title: "",
  });
  const products = useProducts();
  const categories = useCategories();

  const categoriesSelect = [
    "All",
    ...categories.map((category) => category.category),
  ];

  const maxPrice = Math.max(...products.map((product) => product.price));

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      filters.category === "All" || product.category === filters.category;
    const priceMatch = filters.price >= product.price;
    const titleMatch =
      product.title.toLowerCase().includes(filters.title.toLowerCase()) ||
      !filters.title;
    return categoryMatch && priceMatch && titleMatch;
  });

  return (
    <Container className="my-4">
      <Row
        className="gx-3 gy-4 justify-content-center"
        style={{ color: theme.colors.textLight }}
      >
        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: "70%" }}>
          <ItemFilter
            categories={categoriesSelect}
            maxPrice={maxPrice | 2000}
            onFilterChange={setFilters}
          />
        </Col>
        {filteredProducts.map((product) => (
          <Col
            key={product.id}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="d-flex justify-content-center"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;

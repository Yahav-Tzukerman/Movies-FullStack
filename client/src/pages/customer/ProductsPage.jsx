import React from "react";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";
import { Col, Row, Container, Offcanvas } from "react-bootstrap";
import ProductList from "../../components/customer/ProductList";
import Cart from "../../components/cart/Cart";
import CardToggleComp from "../../components/cart/CartToggleButton";

const ProductsPage = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [showCart, setShowCart] = React.useState(false);

  const handleCartToggle = () => setShowCart(!showCart);
  const handleCartClose = () => setShowCart(false);

  const containerStyle = {
    width: "48%",
    backgroundColor: theme.colors.cartBackground,
    color: theme.colors.textLight,
    fontFamily: theme.fontFamily,
  };

  const mediaQueryStyle = {
    "@media (max-width: 768px)": {
      width: "100%",
    },
  };

  const combinedStyle = {
    ...containerStyle,
    ...(window.innerWidth <= 768
      ? mediaQueryStyle["@media (max-width: 768px)"]
      : {}),
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: theme.colors.gradientBackground,
        color: theme.colors.textLight,
        fontFamily: theme.fontFamily,
      }}
    >
      <Container fluid className="py-4">
        {/* Product List takes full width by default */}
        <Row>
          <Col xs={12}>
            <ProductList />
          </Col>
        </Row>

        <CardToggleComp isCartOpen={showCart} onToggleCart={handleCartToggle} />

        {/* Offcanvas for Cart */}
        <Offcanvas
          show={showCart}
          onHide={handleCartClose}
          placement="start"
          style={combinedStyle}
          renderStaticNode={true}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Cart />
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
};

export default ProductsPage;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import appTheme from "../../styles/theme";
import AppButton from "../common/AppButton";
import CartItemCard from "./CartItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ordersService from "../../services/orders.service";
import { useNavigate } from "react-router-dom";
import productsService from "../../services/products.service";

const Cart = () => {
  const app = useSelector((state) => state.app);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = () => {
    cartItems.forEach((cartItem) => {
      const order = {
        title: cartItem.product.title,
        quantity: cartItem.quantity,
        totalPrice: cartItem.product.price * cartItem.quantity,
        date: new Date().toLocaleDateString("en-GB"),
        product: cartItem.product,
        user: user,
      };

      const updatedProduct = {
        ...cartItem.product,
        inStock: cartItem.product.inStock - cartItem.quantity,
      };
      productsService.updateProduct(
        String(cartItem.product?.id),
        updatedProduct
      );
      ordersService.addOrder(order);
    });
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "auth/clearUser" });
    navigate("/signin");
  };

  return (
    <Container fluid className="p-0">
      <Row className="gx-2 gy-2">
        <Col
          xs={12}
          className="d-flex flex-column align-items-start"
          style={{ minHeight: "50vh" }}
        >
          <div
            className="d-flex align-items-center mb-3"
            style={{
              color: theme.colors.textLight,
              fontFamily: theme.fontFamily,
            }}
          >
            <h2 className="me-2 mb-0">Cart</h2>
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ fontSize: "1.5rem" }}
            />
          </div>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((cartItem) => (
              <Row key={cartItem.product.id} className="w-100 m-0">
                <Col xs={12}>
                  <CartItemCard cartItem={cartItem} />
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>
      {cartItems.length > 0 && (
        <div className="mt-3">
          <h5
            className="text-start"
            style={{
              color: theme.colors.textLight,
              fontFamily: theme.fontFamily,
              fontWeight: "bold",
              fontSize: "1.4rem",
              margin: "1rem 0",
            }}
          >
            Total: $
            {cartItems.reduce(
              (acc, cartItem) =>
                acc + cartItem.product.price * cartItem.quantity,
              0
            )}
          </h5>
          <AppButton label="Order" variant="success" onClick={handleOrder} />
        </div>
      )}
    </Container>
  );
};

export default Cart;

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import appTheme from "../../styles/theme";
import AppCounter from "../common/AppCounter";
import useOrders from "../../hooks/useOrders";

const ProductCardComp = ({ product }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const cart = useSelector((state) => state.cart);
  const productBought = useOrders().getProductBought(product.id);
  const dispatch = useDispatch();

  const cartItem = cart.cartItems.find(
    (item) => item.product.id === product.id
  );
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  useEffect(() => {
    const updatedCartItem = cart.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (updatedCartItem) {
      setQuantity(updatedCartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, product.id]);

  return (
    <Card
      className="my-3 p-3"
      style={{
        minWidth: "50%",
        backgroundColor: theme.colors.cardBackground,
        color: theme.colors.textLight,
        fontFamily: theme.fontFamily,
        border: ".5px solid #ccc",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Row className="align-items-center">
        <Col xs={12} md={5} className="mb-3 mb-md-0">
          <h2
            className="fw-bold"
            style={{ fontSize: "2rem", marginBottom: "0.3rem" }}
          >
            {product.title}
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: "1rem", marginBottom: "0.5rem" }}
          >
            {product.description}
          </p>
          <div>Price: ${product.price}</div>
          <div>In stock: {product.inStock}</div>
          <div className="mt-3">
            <AppCounter
              counter={quantity}
              onChange={(count) => {
                dispatch({
                  type: "UPDATE_CART",
                  payload: {
                    product,
                    count: count,
                  },
                });
              }}
            />
          </div>
        </Col>

        <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
          <Image
            src={`/products/${product.imageUrl}.webp`}
            alt={`${product.title}-image`}
            style={{
              width: "12rem",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
              // maxHeight: "200px",
            }}
          />
        </Col>

        <Col xs={12} md={3} className="text-center">
          <div>Bought: {productBought}</div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCardComp;

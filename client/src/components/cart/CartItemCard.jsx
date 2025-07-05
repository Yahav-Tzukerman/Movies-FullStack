import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AppButton from "../common/AppButton";
import appTheme from "../../styles/theme";
import AppCounter from "../common/AppCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CartItemCard = ({ cartItem }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const dispatch = useDispatch();

  return (
    <Card
      className="mb-3"
      style={{
        backgroundColor: theme.colors.cardBackground,
        color: theme.colors.textLight,
        fontFamily: theme.fontFamily,
        border: ".5px solid #000",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Card.Body>
        <Row className="align-items-center gy-2">
          <Col xs={12} sm={12} md={12} lg={3} className="text-center">
            <Card.Title
              className="mb-0"
              style={{ fontSize: "1.3rem", fontWeight: "bold" }}
            >
              {cartItem.product.title}
            </Card.Title>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className="text-center">
            <AppCounter
              counter={cartItem.quantity}
              onChange={(newCount) =>
                dispatch({
                  type: "UPDATE_CART",
                  payload: { product: cartItem.product, count: newCount },
                })
              }
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={3} className="text-center">
            <Card.Text className="mb-0">
              Total: ${cartItem.product.price * cartItem.quantity}
            </Card.Text>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} className="text-center">
            <AppButton
              label={<FontAwesomeIcon icon={faTrashAlt} />}
              variant="error"
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: { id: cartItem.product.id },
                });
              }}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItemCard;

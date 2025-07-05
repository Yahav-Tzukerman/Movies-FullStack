import { useState, useEffect } from "react";
import OrderService from "../services/orders.service";

function useOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = OrderService.getOrders((ordersData) => {
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  function getProductBought(productId) {
    return orders
      .filter(
        (order) => order.product.id === productId && order.user?.agreeTerms
      )
      .map((order) => order.quantity)
      .reduce((a, b) => a + b, 0);
  }

  return { orders, getProductBought };
}

export default useOrders;

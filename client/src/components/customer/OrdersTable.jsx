import React from "react";
import AppTable from "../common/AppTable";
import useOrders from "../../hooks/useOrders";

const OrdersTableComp = () => {
  const { orders } = useOrders();

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Total Price", accessor: "totalPrice" },
    { header: "Date", accessor: "date" },
  ];

  const data = orders.map((order) => {
    const orderDate = order.date;
    return {
      title: order.title,
      quantity: order.quantity,
      totalPrice: `$${order.totalPrice}`,
      date: orderDate,
    };
  });

  return <AppTable columns={columns} data={data} />;
};

export default OrdersTableComp;

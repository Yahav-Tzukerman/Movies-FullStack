import React from "react";
import AppTable from "../common/AppTable";
import useUsers from "../../hooks/useUsers";
import useOrders from "../../hooks/useOrders";

const CustomerTableComp = () => {
  const users = useUsers();
  const {orders} = useOrders();

  const productsBought = orders.map((order) => {
    const product = order.product.title;
    const qty = order.quantity;
    const date = order.date;
    const userId = order.user.userId;
    return { product, qty, date, userId };
  });

  const columns = [
    { header: "Full Name", accessor: "fullName" },
    { header: "Joined At", accessor: "joinedAt" },
    { header: "Products Bought", accessor: "productsTable" },
  ];

  const columnsInner = [
    { header: "Product", accessor: "product" },
    { header: "QTY", accessor: "qty" },
    { header: "Date", accessor: "date" },
  ];

  const data = users.map((user) => {
    const usrProductsBought = productsBought.filter(
      (order) => order.userId === user.id
    );

    const joinedAtDate = new Date(
      user.createdAt.seconds * 1000 + user.createdAt.nanoseconds / 1e6
    );
    const formattedDate = `${joinedAtDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(joinedAtDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${joinedAtDate.getFullYear()}`;
    return {
      fullName: `${user.firstName} ${user.lastName}`,
      joinedAt: formattedDate,
      productsTable: (
        <div style={{ maxHeight: "25vh", overflow: "auto" }}>
          <AppTable columns={columnsInner} data={usrProductsBought || []} />
        </div>
      ),
    };
  });

  return (
    <div
      style={{
        maxHeight: "75vh",
        overflow: "auto",
      }}
    >
      <AppTable columns={columns} data={data} />
    </div>
  );
};

export default CustomerTableComp;

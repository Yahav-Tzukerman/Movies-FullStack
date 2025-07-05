import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useProducts from "../../hooks/useProducts";
import useOrders from "../../hooks/useOrders";
import useUsers from "../../hooks/useUsers";
import AppComboBox from "../common/AppComboBox";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";
import { Card, Row, Col } from "react-bootstrap";
import AppLabel from "../common/AppLabel";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Statistics = () => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const products = useProducts();
  const orders = useOrders();
  const users = useUsers();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);

  // State to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define breakpoints
  const MOBILE_BREAKPOINT = 768; // px

  // Determine if the device is mobile
  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  // Define responsive font sizes and offsets
  const labelFontSize = isMobile ? 12 : 14;
  const labelOffset = isMobile ? 6 : 10;

  // Predefined color palette for consistency
  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#36A2EB",
    "#FF6384",
    "#4BC0C0",
    // Add more colors as needed
  ];

  const pieData = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        data: products.map((p) => orders.getProductBought(p.id)),
        backgroundColor: products.map(
          (_, index) => COLORS[index % COLORS.length]
        ),
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // Disable the default legend
      },
      datalabels: {
        labels: {
          // Label for the amount inside the slice
          amount: {
            align: "center",
            anchor: "center",
            display: (context) => {
              // Show label only if the slice size is significant (>5%)
              const dataset = context.dataset;
              const dataIndex = context.dataIndex;
              const total = dataset.data.reduce((acc, value) => acc + value, 0);
              const value = dataset.data[dataIndex];
              return value / total > 0.05;
            },
            formatter: (value) => value,
            color: "#fff",
            font: {
              size: 14, // Font size
              weight: "bold", // Font weight
            },
            textStrokeColor: "#000",
            textStrokeWidth: 2,
          },
          // Label for the product title outside the slice
          label: {
            align: "start",
            anchor: "end",
            offset: labelOffset, // Responsive offset
            display: (context) => {
              // Show label only if the slice size is significant (>15%)
              const dataset = context.dataset;
              const dataIndex = context.dataIndex;
              const total = dataset.data.reduce((acc, value) => acc + value, 0);
              const value = dataset.data[dataIndex];
              return value / total > 0.05;
            },
            formatter: (value, context) => {
              return context.chart.data.labels[context.dataIndex];
            },
            color: "#fff",
            font: {
              size: 14, // Font size
              weight: "bold", // Font weight
            },
            textStrokeColor: "#000",
            textStrokeWidth: 2,
          },
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips for interactivity
      },
    },
  };

  // Function to sort the bar data in descending order
  const sortBarData = (orders) => {
    const sorted = [...orders].sort((a, b) => b.quantity - a.quantity);
    return sorted;
  };

  const barData = {
    labels: selectedUserOrders.map((p) => p.title),
    datasets: [
      {
        label: selectedUser,
        data: selectedUserOrders.map((o) => o.quantity),
        backgroundColor: selectedUserOrders.map(
          (_, index) => COLORS[index % COLORS.length]
        ),
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to fill the container
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: theme.colors.textLight,
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: theme.colors.textLight,
          // Callback to format y-axis labels without decimals
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
            return value.toFixed(0);
          },
        },
        grid: {
          display: false,
        },
        beginAtZero: true, // Ensures y-axis starts at zero
      },
    },
    plugins: {
      legend: {
        display: false, // Remove legends
      },
      datalabels: {
        display: true, // Enable datalabels for the bar chart
        anchor: "center",
        align: "center",
        formatter: (value) => value,
        color: "#fff",
        font: {
          size: 14, // Font size
          weight: "bold", // Font weight
        },
        textStrokeColor: "#000",
        textStrokeWidth: 2,
      },
      tooltip: {
        enabled: true, // Enable tooltips for interactivity
      },
    },
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    if (Array.isArray(orders.orders)) {
      const userOrders = orders.orders.filter(
        (o) => o.user?.username === e.target?.value
      );

      const uniqueOrders = [];
      const orderMap = new Map();

      userOrders.forEach((order) => {
        if (orderMap.has(order.product.id)) {
          orderMap.get(order.product.id).quantity += order.quantity;
        } else {
          orderMap.set(order.product.id, { ...order });
          uniqueOrders.push(orderMap.get(order.product.id));
        }
      });

      const sortedOrders = sortBarData(uniqueOrders);

      setSelectedUserOrders(sortedOrders);
    }
  };

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2rem",
      }}
    >
      {/* Pie Chart Column */}
      <Col xs={12} md={6} lg={6}>
        <Card
          className="my-3 p-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.cardBackground,
            color: theme.colors.textLight,
            fontFamily: theme.fontFamily,
            border: ".5px solid #ccc",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Total Sold Products</h2>
          <div
            style={{
              width: isMobile ? "300px" : "500px", // Responsive width
              height: isMobile ? "300px" : "500px", // Responsive height
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pie
              data={pieData}
              options={pieOptions}
              plugins={[ChartDataLabels]}
            />
          </div>
        </Card>
      </Col>

      {/* Bar Chart Column */}
      <Col xs={12} md={6}>
        <Card
          className="my-3 p-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.cardBackground,
            color: theme.colors.textLight,
            fontFamily: theme.fontFamily,
            border: ".5px solid #ccc",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            minHeight: "60vh", // Increased minHeight for a bigger chart
          }}
        >
          <h2>Products Quantity Per Customer</h2>
          <div
            style={{
              width: "80%", // Increased width for better layout
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: "1rem", // Added margin for spacing
            }}
          >
            <AppLabel text="Sort By Customer" />
            <AppComboBox
              name="user-select"
              value={selectedUser}
              onChange={handleUserChange}
              options={users.map((u) => u.username)}
              defaultOption={"Select User"}
            />
          </div>
          {selectedUser !== "" && (
            <div
              style={{
                width: "100%", // Full width for larger chart
                height: "400px", // Increased height for better visibility
              }}
            >
              <Bar data={barData} options={barOptions} />
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Statistics;

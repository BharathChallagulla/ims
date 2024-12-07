"use client";
import React, { useState, useRef } from "react";
import { Grid2 as Grid } from "@mui/material";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Bar, Pie, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ProductProps } from "@/types";
import CustomModal from "./CustomModal";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC<{ products: ProductProps[] }> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const barChartRef = useRef<any>(null);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const pieChartRef = useRef<any>(null);

  // Calculate Stats
  const totalItems = products.length;
  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Prepare Data for Graphs
  const categories = [...new Set(products.map((product) => product.category))];
  const quantitiesByCategory = categories.map((category) =>
    products
      .filter((product) => product.category === category)
      .reduce((sum, p) => sum + p.quantity, 0)
  );
  const valuesByCategory = categories.map((category) =>
    products
      .filter((product) => product.category === category)
      .reduce((sum, p) => sum + p.price * p.quantity, 0)
  );

  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Quantity by Category",
        data: quantitiesByCategory,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Value by Category",
        data: valuesByCategory,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Inventory Distribution",
        data: quantitiesByCategory,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  // Handle chart clicks
  const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const element = getElementAtEvent(barChartRef.current, event);
    if (element.length > 0) {
      const index = element[0].index;
      setSelectedCategory(categories[index]);
    }
  };

  const handlePieClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const element = getElementAtEvent(pieChartRef.current, event);
    if (element.length > 0) {
      const index = element[0].index;
      setSelectedCategory(categories[index]);
    }
  };

  // Download chart as an image
  const downloadChart = (chartRef: React.RefObject<any>, filename: string) => {
    if (chartRef.current) {
      const link = document.createElement("a");
      link.href = chartRef.current.toBase64Image();
      link.download = filename;
      link.click();
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography className="text-lg font-semibold" gutterBottom>
        Inventory Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Total Stats */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography className="text-sm">Total Items</Typography>
              <Typography className="text-lg">{totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography className="text-sm">Total Quantity</Typography>
              <Typography className="text-lg">{totalQuantity}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography className="text-sm">Total Inventory Value</Typography>
              <Typography className="text-lg">
                ${totalValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography className="text-sm" gutterBottom>
                Quantity and Value by Category (Bar Chart)
              </Typography>
              <Bar
                ref={barChartRef}
                data={barData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
                onClick={handleBarClick}
              />
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => downloadChart(barChartRef, "bar-chart.png")}
              >
                Download Bar Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography className="text-sm" gutterBottom>
                Inventory Distribution (Pie Chart)
              </Typography>
              <Pie ref={pieChartRef} data={pieData} onClick={handlePieClick} />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                size="small"
                onClick={() => downloadChart(pieChartRef, "pie-chart.png")}
              >
                Download Pie Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Selected Category Details */}
      {selectedCategory && (
        <CustomModal
          open={true}
          handleClose={() => setSelectedCategory(null)}
          title={`Details for Category: ${selectedCategory}`}
        >
          <Box sx={{ mt: 1 }}>
            <Typography className="text-sm" id="modal-modal-title">
              Details for Category: {selectedCategory}
            </Typography>
            {products
              .filter((product) => product.category === selectedCategory)
              .map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ccc",
                    padding: 1,
                  }}
                >
                  <Typography>{product.name}</Typography>
                  <Typography>Quantity: {product.quantity}</Typography>
                  <Typography>Price: ${product.price.toFixed(2)}</Typography>
                </Box>
              ))}
          </Box>
        </CustomModal>
      )}
    </Box>
  );
};

export default Dashboard;

"use client";

import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,

  LinearScale,

  BarElement,

  ArcElement,

  Tooltip,

  Legend,
);

export default function DashboardCharts({ dashboardData }) {
  const income = Number(dashboardData?.summary?.totalIncome || 0);

  const expense = Number(dashboardData?.summary?.totalExpense || 0);

  const categoryColors = [
    "#0d6efd",
    "#198754",
    "#dc3545",
    "#ffc107",
    "#6f42c1",
    "#fd7e14",
    "#20c997",
  ];

  const barData = {
    labels: ["Income", "Expense"],

    datasets: [
      {
        label: "Finance Overview",

        data: [income, expense],

        backgroundColor: ["#198754", "#dc3545"],
      },
    ],
  };

  const pieData = {
    labels:
      dashboardData?.categories?.map(
        (item) => item.category?.name || "Unknown",
      ) || [],

    datasets: [
      {
        data:
          dashboardData?.categories?.map((item) => Number(item._sum.amount)) ||
          [],

        backgroundColor: categoryColors,
      },
    ],
  };

  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="card p-3">
          <h5>Income vs Expense</h5>

          <Bar data={barData} />
        </div>
      </div>

      <div className="col-md-6">
        <div className="card p-3">
          <h5>Category Breakdown</h5>

          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

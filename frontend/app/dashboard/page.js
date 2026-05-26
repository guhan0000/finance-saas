"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import TransactionForm from "@/components/transaction/TransactionForm";

import TransactionTable from "@/components/transaction/TransactionTable";

import CategoryManager from "@/components/category/CategoryManager";

import DashboardCharts from "@/components/dashboard/DashboardCharts";

import UserManager from "@/components/user/UserManager";

import { useDashboard } from "@/hooks/dashboard/useDashboard";

import { exportCSV } from "@/services/export/export.service";

export default function DashboardPage() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="container mt-5">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }
  const handleExport = async () => {
    try {
      const blob = await exportCSV();

      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "transactions.csv");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mt-5">
        {/* ================= ADMIN ================= */}

        {user?.role === "ADMIN" && (
          <>
            <h1 className="mb-4">User Management</h1>

            <UserManager />
          </>
        )}

        {/* ================= USER ================= */}

        {user?.role === "USER" && (
          <>
            <h1 className="mb-4">My Dashboard</h1>

            {/* SUMMARY */}

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card p-3">
                  <h5>Total Income</h5>

                  <h3>₹{data?.summary?.totalIncome}</h3>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card p-3">
                  <h5>Total Expense</h5>

                  <h3>₹{data?.summary?.totalExpense}</h3>
                </div>
              </div>
            </div>

            {/* CHARTS */}

            <DashboardCharts dashboardData={data} />

            {/* TRANSACTION FORM */}

            <TransactionForm />

            {/* TRANSACTION TABLE */}

            <TransactionTable />
          </>
        )}

        {/* ================= ACCOUNTANT ================= */}

        {user?.role === "ACCOUNTANT" && (
          <>
            <h1 className="mb-4">Organization Finance</h1>

            {/* SUMMARY */}

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card p-3">
                  <h5>Organization Income</h5>

                  <h3>₹{data?.summary?.totalIncome}</h3>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card p-3">
                  <h5>Organization Expense</h5>

                  <h3>₹{data?.summary?.totalExpense}</h3>
                </div>
              </div>
            </div>

            {/* CHARTS */}

            <DashboardCharts dashboardData={data} />

            {/* CATEGORY MANAGEMENT */}

            <CategoryManager />

            {/* EXPORT CSV */}

            <button onClick={handleExport} className="btn btn-dark mt-3">
              Export CSV
            </button>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}

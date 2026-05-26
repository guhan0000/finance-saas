"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import TransactionForm from "@/components/transaction/TransactionForm";

import TransactionTable from "@/components/transaction/TransactionTable";

import { useDashboard } from "@/hooks/dashboard/useDashboard";

import { logout } from "@/lib/auth";
import CategoryManager from "@/components/category/CategoryManager";
import DashboardCharts from "@/components/dashboard/DashboardCharts";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  if (isLoading) {
    return (
      <div className="container mt-5">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-4">
          <h1>Dashboard</h1>

          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </div>

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
        <DashboardCharts dashboardData={data} />
        <CategoryManager />

        <TransactionForm />

        <TransactionTable />
      </div>
    </ProtectedRoute>
  );
}

"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { logout } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mt-5">

        <div className="d-flex justify-content-between">

          <h1>Dashboard</h1>

          <button
            onClick={logout}
            className="btn btn-danger"
          >
            Logout
          </button>

        </div>

      </div>
    </ProtectedRoute>
  );
}
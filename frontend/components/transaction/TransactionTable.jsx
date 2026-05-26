"use client";

import { useState } from "react";

import { useTransactions } from "@/hooks/transaction/useTransaction";

export default function TransactionTable() {
  const [page, setPage] = useState(1);

  const [type, setType] = useState("");

  const { data, isLoading } = useTransactions(page, type);

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status" />

        <p className="mt-2">Loading Transactions...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3">
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>

          <option value="INCOME">Income</option>

          <option value="EXPENSE">Expense</option>
        </select>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>

              <td>₹{item.amount}</td>

              <td>{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex gap-2">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

"use client";

import { useTransactions } from "@/hooks/transaction/useTransaction";

export default function TransactionTable() {
  const { data, isLoading } = useTransactions();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <table className="table">
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

            <td>{item.amount}</td>

            <td>{item.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

"use client";

import { useForm } from "react-hook-form";

import { useCreateTransaction } from "@/hooks/transaction/useTransaction";

export default function TransactionForm() {
  const { register, handleSubmit, reset } = useForm();

  const mutation = useCreateTransaction();

  const onSubmit = (data) => {
    data.amount = Number(data.amount);

    mutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-3 mb-4">
      <h4>Add Transaction</h4>

      <input
        {...register("title")}
        placeholder="Title"
        className="form-control mb-3"
      />

      <input
        type="number"
        {...register("amount")}
        placeholder="Amount"
        className="form-control mb-3"
      />

      <select {...register("type")} className="form-select mb-3">
        <option value="EXPENSE">Expense</option>

        <option value="INCOME">Income</option>
      </select>

      <input
        {...register("categoryId")}
        placeholder="Category ID"
        className="form-control mb-3"
      />

      <button className="btn btn-dark">Add Transaction</button>
    </form>
  );
}

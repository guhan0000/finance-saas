"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useCreateTransaction } from "@/hooks/transaction/useTransaction";

import { useCategories } from "@/hooks/category/useCategory";

import toast from "react-hot-toast";

export default function TransactionForm() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const mutation = useCreateTransaction();

  const { data: categories } = useCategories();

  const selectedCategory = watch("categoryId");

  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      setValue("categoryId", categories[0].id);
    }
  }, [categories, selectedCategory, setValue]);

  const onSubmit = (data) => {
    if (!data.categoryId) {
      alert("Please select category");

      return;
    }

    data.amount = Number(data.amount);

    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Transaction Added");

        reset({
          title: "",

          amount: "",

          type: "EXPENSE",

          categoryId: categories?.[0]?.id || "",
        });
      },

      onError: () => {
        toast.error("Failed to Add Transaction");
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

      <select
        {...register("type")}
        className="form-select mb-3"
        defaultValue="EXPENSE"
      >
        <option value="EXPENSE">Expense</option>

        <option value="INCOME">Income</option>
      </select>

      <select {...register("categoryId")} className="form-select mb-3">
        <option value="">Select Category</option>

        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button className="btn btn-dark">Add Transaction</button>
    </form>
  );
}

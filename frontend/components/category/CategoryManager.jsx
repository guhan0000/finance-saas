"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "@/hooks/category/useCategory";

export default function CategoryManager() {
  const [name, setName] = useState("");

  const { data: categories } = useCategories();

  const createMutation = useCreateCategory();

  const deleteMutation = useDeleteCategory();

  const handleCreate = () => {
    if (!name) return;

    createMutation.mutate(
      { name },
      {
        onSuccess: () => {
          toast.success("Category Added");

          setName("");
        },

        onError: () => {
          toast.error("Failed to Add Category");
        },
      },
    );
  };

  return (
    <div className="card p-3 mb-4">
      <h4>Manage Categories</h4>

      <div className="d-flex gap-2 mb-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="form-control"
        />

        <button
          onClick={handleCreate}
          className="btn btn-dark"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="list-group">
        {categories?.map((category) => (
          <li
            key={category.id}
            className="list-group-item d-flex justify-content-between"
          >
            {category.name}

            <button
              className="btn btn-danger btn-sm"
              disabled={deleteMutation.isPending}
              onClick={() =>
                deleteMutation.mutate(category.id, {
                  onSuccess: () => {
                    toast.success("Category Deleted");
                  },

                  onError: () => {
                    toast.error("Delete Failed");
                  },
                })
              }
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

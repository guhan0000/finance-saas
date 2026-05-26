"use client";

import { useState } from "react";

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
          setName("");
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

        <button onClick={handleCreate} className="btn btn-dark">
          Add
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
              onClick={() => deleteMutation.mutate(category.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

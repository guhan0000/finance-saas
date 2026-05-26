"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { useUsers, useCreateUser } from "@/hooks/user/useUser";

export default function UserManager() {
  const [form, setForm] = useState({
    name: "",

    email: "",

    password: "",

    role: "USER",
  });

  const { data: users } = useUsers();

  const mutation = useCreateUser();

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    mutation.mutate(form, {
      onSuccess: () => {
        toast.success("User Created");

        setForm({
          name: "",

          email: "",

          password: "",

          role: "USER",
        });
      },

      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed");
      },
    });
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="mb-3">User Management</h4>

      {/* CREATE USER */}

      <div className="row mb-4">
        <div className="col-md-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="USER">USER</option>

            <option value="ACCOUNTANT">ACCOUNTANT</option>
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-dark w-100"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      {/* USER LIST */}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";

import { useRegister } from "@/hooks/auth/useAuth";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const mutation = useRegister();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="mb-4">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                {...register("name")}
                placeholder="Name"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <input
                {...register("email")}
                placeholder="Email"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <input
                {...register("orgName")}
                placeholder="Organization"
                className="form-control"
              />
            </div>

            <button className="btn btn-dark w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

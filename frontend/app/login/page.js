"use client";

import { useForm } from "react-hook-form";

import { useLogin } from "@/hooks/auth/useAuth";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const mutation = useLogin();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="mb-4">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            <button className="btn btn-dark w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

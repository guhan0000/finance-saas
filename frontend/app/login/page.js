"use client";

import { useForm } from "react-hook-form";

import { useLogin } from "@/hooks/auth/useAuth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useLogin();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4">
            <h2 className="mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
              {/* EMAIL */}

              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>

              {/* PASSWORD */}

              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

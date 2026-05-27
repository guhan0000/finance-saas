"use client";

import { useForm } from "react-hook-form";

import { useRegister } from "@/hooks/auth/useAuth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerMutation = useRegister();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="mb-4 text-center">Register</h2>

            <form
              onSubmit={handleSubmit((data) => registerMutation.mutate(data))}
            >
              {/* NAME */}

              <div className="mb-3">
                <label className="form-label">Name</label>

                <input
                  className="form-control"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>

              {/* ORG */}

              <div className="mb-3">
                <label className="form-label">Organization Name</label>

                <input
                  className="form-control"
                  {...register("orgName", {
                    required: "Organization name is required",
                  })}
                />

                {errors.orgName && (
                  <small className="text-danger">
                    {errors.orgName.message}
                  </small>
                )}
              </div>

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

                    minLength: {
                      value: 6,

                      message: "Password must be at least 6 characters",
                    },
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
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

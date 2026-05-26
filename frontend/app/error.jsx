"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-danger">Something went wrong</h1>

      <p className="mt-3">{error.message}</p>

      <button className="btn btn-dark mt-3" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}

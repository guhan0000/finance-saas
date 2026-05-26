import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Finance SaaS Platform</h1>

      <p className="lead mt-3">Multi-tenant finance management application</p>

      <div className="mt-4 d-flex justify-content-center gap-3">
        <Link href="/login" className="btn btn-dark">
          Login
        </Link>

        <Link href="/register" className="btn btn-outline-dark">
          Register
        </Link>
      </div>
    </div>
  );
}

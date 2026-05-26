"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { logout } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        {isDashboard ? (
          <span className="navbar-brand mb-0 h1">Finance SaaS</span>
        ) : (
          <Link href="/" className="navbar-brand">
            Finance SaaS
          </Link>
        )}

        {!isDashboard ? (
          <div className="d-flex gap-2">
            <Link href="/login" className="btn btn-outline-light btn-sm">
              Login
            </Link>

            <Link href="/register" className="btn btn-light btn-sm">
              Register
            </Link>
          </div>
        ) : (
          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

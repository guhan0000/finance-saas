# Finance SaaS Platform

A full-stack multi-tenant Finance SaaS application built with Next.js, Node.js, Express, Prisma, and MySQL/PostgreSQL.

The platform supports secure JWT authentication, refresh token rotation, role-based access control (RBAC), dashboard analytics, CSV exports, and organization-based financial management.

---

# Features

## Authentication & Security

- JWT Authentication
- Refresh Token Rotation
- Protected Routes
- Role-Based Access Control (RBAC)
- Password Hashing using bcrypt
- Helmet Security Middleware
- Rate Limiting using express-rate-limit
- Centralized Error Handling
- Input Validation

---

# Multi-Tenant Architecture

- Organization-based data isolation
- Each organization has:
  - Admin
  - Users
  - Accountants
- Secure scoped access per organization and user

---

# Roles & Responsibilities

## ADMIN

- Create organization users
- Manage USER and ACCOUNTANT roles
- Access only user management module

---

## USER

- Add income and expense transactions
- View personal dashboard
- View only own transactions
- View personal charts and analytics

---

## ACCOUNTANT

- View organization-wide finance analytics
- Manage categories
- Export organization transactions as CSV
- View cumulative income and expenses

---

# Dashboard Features

- Income & Expense Summary
- Category Breakdown Charts
- Personal Dashboard (USER)
- Organization Dashboard (ACCOUNTANT)
- CSV Export Feature

---

# Tech Stack

## Frontend

- Next.js
- React
- Bootstrap
- React Query
- React Hook Form
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcryptjs
- Helmet
- Express Rate Limit
- Pino/Winston Logging

---

## Database

- MySQL / PostgreSQL

---

# Project Structure

```bash
finance-saas/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── lib/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   ├── routes/
│   ├── prisma/
│   └── config/
│
└── README.md
```

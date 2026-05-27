# Architecture Document

# Finance SaaS Platform Architecture

This document explains the architectural decisions, security design, scalability considerations, and backend structure used in the Finance SaaS Platform.

---

# 1. System Overview

The application is a multi-tenant Finance SaaS platform where multiple organizations can securely manage financial transactions.

Each organization can have:

- ADMIN
- USER
- ACCOUNTANT

The system ensures secure organization-level and user-level data isolation.

---

# 2. High-Level Architecture

```txt
Frontend (Next.js)
        ↓
REST API (Express.js)
        ↓
Service Layer
        ↓
Repository Layer
        ↓
Prisma ORM
        ↓
PostgreSQL Database
```

---

# 3. Frontend Architecture

Frontend is built using:

- Next.js App Router
- React Query
- React Hook Form
- Bootstrap

---

# Frontend Responsibilities

## UI Rendering

Role-based dashboards:

- ADMIN Dashboard
- USER Dashboard
- ACCOUNTANT Dashboard

---

## State Management

React Query is used for:

- API caching
- loading states
- mutation handling
- request synchronization

---

## Form Handling

React Hook Form is used for:

- validation
- error handling
- optimized rendering

---

# 4. Backend Architecture

Backend follows strict layered architecture.

```txt
Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Database
```

---

# Why Layered Architecture?

This architecture improves:

- scalability
- maintainability
- separation of concerns
- reusability
- testability

---

# Layer Responsibilities

## Routes

Responsible for:

- API endpoint definitions
- middleware binding
- request routing

---

## Controllers

Responsible for:

- request handling
- sending responses
- delegating business logic

Controllers remain thin and lightweight.

---

## Services

Responsible for:

- business logic
- RBAC rules
- validation flow
- transaction orchestration

---

## Repositories

Responsible for:

- database queries
- Prisma operations
- optimized query handling

This separates database access from business logic.

---

# 5. Authentication Architecture

Authentication is implemented using:

- JWT Access Tokens
- Refresh Tokens
- Refresh Token Rotation

---

# Access Token

Short-lived JWT used for:

- API authentication
- protected routes
- RBAC authorization

---

# Refresh Token

Long-lived token used to:

- generate new access tokens
- maintain sessions securely

Refresh tokens are stored in database.

---

# Refresh Token Rotation

Whenever a refresh token is used:

1. Old refresh token is deleted
2. New refresh token is generated
3. New token is stored in database

This prevents:

- token replay attacks
- token reuse attacks

---

# 6. Role-Based Access Control (RBAC)

The system uses strict RBAC.

---

# ADMIN

Responsibilities:

- manage users
- assign roles
- organization administration

Restrictions:

- cannot manage transactions
- cannot export CSV
- cannot access organization finance analytics

---

# USER

Responsibilities:

- add transactions
- manage own transactions
- view personal dashboard

Restrictions:

- cannot access other users' data
- cannot export CSV
- cannot manage categories

---

# ACCOUNTANT

Responsibilities:

- manage categories
- view organization-wide analytics
- export organization CSV reports

Restrictions:

- cannot manage users
- cannot modify user transactions

---

# 7. Multi-Tenant Data Isolation

The application uses organization-level isolation.

Every:

- user
- transaction
- category

belongs to an organization.

---

# Isolation Strategy

## USER Queries

USER queries filter using:

```txt
userId
```

This ensures users only access their own data.

---

## ACCOUNTANT Queries

ACCOUNTANT queries filter using:

```txt
orgId
```

This allows organization-wide finance analytics.

---

# 8. Dashboard Architecture

Dashboard data is role-scoped.

---

# USER Dashboard

Shows:

- personal income
- personal expenses
- personal charts
- own transactions

---

# ACCOUNTANT Dashboard

Shows:

- cumulative organization income
- cumulative organization expenses
- organization analytics

---

# 9. Database Design

Database is managed using Prisma ORM.

---

# Core Models

## User

Stores:

- user details
- roles
- organization mapping

---

## Organization

Represents tenant organizations.

---

## Transaction

Stores:

- income
- expense
- category mappings

---

## Category

Organization-specific finance categories.

---

## RefreshToken

Stores active refresh tokens.

---

# 10. Scalability Considerations

The system includes several scalability optimizations.

---

# Pagination

Transaction APIs support:

- page
- limit
- skip/take

This prevents loading excessive data.

---

# Database Indexing

Indexes are added on:

- orgId
- userId
- categoryId

to optimize query performance.

---

# Connection Pooling

Managed PostgreSQL with connection pooling is used to:

- reduce DB overload
- improve concurrent performance

---

# 11. Security Architecture

Security mechanisms include:

- Helmet middleware
- JWT authentication
- RBAC authorization
- Password hashing using bcrypt
- Refresh token rotation
- Protected routes
- Centralized error handling
- Input validation
- Rate limiting

---

# 12. Error Handling

Centralized error middleware handles:

- API errors
- validation failures
- unexpected exceptions

This ensures:

- consistent responses
- no application crashes

---

# 13. Logging

Structured logging is implemented using:

- Pino / Winston

This improves:

- debugging
- monitoring
- production observability

---

# 14. Deployment Architecture

## Frontend

Deployed on:

- Vercel

---

## Backend

Deployed on:

- Render

---

## Database

Managed PostgreSQL:

- Supabase / Neon

---

# 15. CI/CD Pipeline

GitHub Actions pipeline runs on every push.

Pipeline includes:

- dependency installation
- lint checks
- Prisma validation
- frontend build checks

Pipeline fails automatically if any step fails.

---

# 16. Future Improvements

Potential future enhancements:

- Email verification
- Forgot password
- Audit logs
- Notifications
- Monthly reporting
- Recurring transactions
- Dark mode
- Advanced analytics

---

# Conclusion

The Finance SaaS Platform was designed using scalable backend architecture principles, secure authentication mechanisms, strict RBAC authorization, and multi-tenant data isolation.

The layered architecture and modular design make the system maintainable, scalable, and production-ready.

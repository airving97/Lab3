# MyPortfolio — COMP229 Assignment 3

## Setup

1. Install Node.js and start MongoDB.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
3. Run `npm install` and `npm --prefix client install`.
4. Run `npm run seed:admin` to create the administrator account in MongoDB.
5. Run `npm run dev`.
6. Open `http://localhost:5173`.

## Features

- React portfolio pages and MongoDB-backed education, projects, and contact forms
- JWT signup, signin, signout, and session restoration
- Admin-only create, edit, and delete operations
- Read-only access to projects and qualifications for visitors and regular users
- Public contact submissions; admin-only contact management

## Routes

- `POST /api/auth/signup`, `POST /api/auth/signin`, `GET /api/auth/signout`, `GET /api/auth/me`
- `GET /api/projects`, `GET /api/qualifications`, `GET /api/contacts`
- `POST /api/contacts` (public)
- `POST`, `PUT /:id`, `DELETE /:id` for projects and qualifications (admin only)
- `PUT /:id`, `DELETE /:id` for contacts (admin only)

Set a strong admin password and keep `.env` out of Git.

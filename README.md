# development_platforms_course_assignment_REST_API

REST API built with Express, TypeScript and MySQL. Features JWT authentication and article management.

## Tech stack

- Express.js
- TypeScript
- MySQL (mysql2)
- JWT
- bcrypt

## Prerequisites

- Node.js 18 or newer (check with `node -v`)
- MySQL 8 (running locally) and MySQL Workbench

## Setup

1. Clone repo and install dependencies:

```bash
git clone https://github.com/priscilla-cassandra/development_platforms_course_assignment_REST_API.git
cd development_platforms_course_assignment_REST_API
npm install
```

2. Create your environment file:

- Mac / Linux Git Bash: `cp .env.example .env`
- Windows: `copy .env.example .env`

Fill in your database credentials in `.env`

3. Generate a JWT secret and paste it into `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

4. Create the database and tables (manual setup):

- Open MySQL workbench and connect to your local server
- Open `database/schema.sql`
- Run the whole script

5. Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:3000`.

## Endpoints

- `POST /auth/register`: register a user
- `POST /auth/login`: log in and receive a JWT
- `GET /articles`: view all articles (public)
- `POST /articles`: submit an article (requires JWT)

### Examples

**Register**

```json
POST /auth/register
{ "email": "user@example.com", "password": "Password123!" }
```

Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character

**Login**

```json
POST /auth/login
{ "email": "user@example.com", "password": "Password123!" }
```

Response:

```json
{
  "message": "Login successful",
  "user": { "id": 1, "email": "user@example.com" },
  "token": "<jwt>"
}
```

**Create article** (send the token in the header)

```
Authorization: Bearer <jwt>
```

```json
POST /articles
{ "title": "My title", "body": "Article text", "category": "Tech" }
```

**Get all articles**

```
GET /articles
```

No auth needed. Response (200):

```json
[
  {
    "id": 1,
    "title": "My first article",
    "body": "Article text goes here.",
    "category": "Tech",
    "submitted_by": "user@example.com",
    "created_at": "2026-10-07T07:30:00.000Z"
  }
]
```

## Error responses

Errors return JSON in this format:

```json
{ "error": "Description of the problem" }
```

Status codes used: 400, 401, 403, 404, 409, 500.

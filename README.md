# development_platforms_course_assignment_REST_API

REST API built with Express, TypeScript and MySQL. Features JWT authentication and article management.

## Tech stack

Express.js
TypeScript
MySQL (mysql2)
JWT
bcrypt

## Endpoints

- `POST /auth/register`: register a user
- `POST /auth/login`: log in and receive a JWT
- `GET /articles`: view all articles (public)
- `POST /articles`: submit an article (requires JWT)

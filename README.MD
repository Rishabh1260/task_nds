============================================================
Backend Developer Task – Users API
============================================================

## OVERVIEW

This task evaluates your ability to work with a real-world backend codebase
using Node.js and relational data.

This is NOT a system-design or architecture exercise.

============================================================

## TECH STACK (REQUIRED)

- Node.js
- Express
- CommonJS (require, not import)
- Vanilla JavaScript (no TypeScript)
- MySQL using mysql2/promise
  Do NOT use ORMs or query builders (Sequelize, Prisma, Knex, etc.).

============================================================

## DATABASE

You are provided with SQL files (in the DB directory) that define the schema and seed data.

Tables:

- users
- user_profiles

You are expected to initialize the database locally using the provided SQL files.

Assume the schema is correct. Do not modify it.

============================================================

## API REQUIREMENTS

## GET /users

Optional query parameters:

- city
- age_gt (age greater than)
- age_lt (age less than)
- limit
- offset

Notes:

- `age_gt` and `age_lt` represent "greater than" and "less than" filters respectively
- Avoid unnecessary database calls
- Prefer efficient SQL queries over application-level filtering

---

## GET /users/:id

- Returns user details along with profile information
- Return 404 if user does not exist

---

## POST /users

- Create a new user
- May optionally include profile data
- No authentication or session logic required

---

## PATCH /users/:id

- Partial updates only
- Update only provided fields

---

# PUT /users/:id/profile

---

- Create profile if it does not exist
- Update profile if it already exists

---

## DELETE /users/:id

- Delete the user
- Handle associated profile data correctly
- Document any assumptions made

## EXPECTATIONS

You will be evaluated on:

- Code structure and organization
- Clarity and readability of code
- Database query efficiency
- Error handling and response consistency
- Comments that explain **why** decisions were made
- Awareness of time and space complexity where relevant

---

## BONUS (OPTIONAL)

The following are **not required** and will not negatively affect evaluation if omitted. They are simply BONUS evaluation points.

Bonus points may be awarded for:

- Efficient SQL query design (filters and joins handled at the database level)
- Consistent and meaningful use of HTTP status codes and error responses
- Correct and predictable PATCH vs PUT update semantics
- Clear comments explaining assumptions or tradeoffs

Optional stretch (pick at most one):

- Pagination metadata (e.g. total count, hasNext)
- Basic request logging (method, path, execution time)
- Simple input validation helper without heavy libraries

You are NOT expected to:

- Implement authentication or authorization
- Add rate limiting
- Containerize the application
- Deploy the service

============================================================

## SETUP

- Project structure is up to you
- Use environment variables via a .env file
- Refer to .env.example for required variables

============================================================

## SUBMISSION

- Fork the repository and push your solution
- Include run instructions in your README
- Application should start using standard Node.js tooling

============================================================

## NOTES

This task reflects real backend work.
Clarity > clever abstractions.
Predictable code > fancy code.

============================================================

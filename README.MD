============================================================
Backend Developer Task – Users API
============================================================

## OVERVIEW

This project is my implementation of the **Backend Developer Task – Users API**.

It is a RESTful API built using Node.js, Express, and MySQL for managing users and their profiles.  
The API supports filtering, pagination, and relational data handling as required.

============================================================

## TECH STACK (USED)

- Node.js
- Express
- CommonJS (require, not import)
- Vanilla JavaScript (no TypeScript)
- MySQL using mysql2/promise

============================================================

## API IMPLEMENTATION

All the APIs listed below are implemented and working as expected.

## GET /users

Fetches a list of users along with profile information.

Supported query parameters:

- `city`  
  (ex. `GET /users?city=Delhi`)

- `age_gt` – age greater than  
  (ex. `GET /users?age_gt=25`)

- `age_lt` – age less than  
  (ex. `GET /users?age_lt=40`)

- `limit` – number of records to return  
  (ex. `GET /users?limit=10`)

- `offset` – pagination offset  
  (ex. `GET /users?limit=10&offset=20`)

---

## GET /users/:id ✅

- Returns user details along with profile information
- Returns 404 if the user does not exist

---

## POST /users ✅

- Creates a new user
- Profile data can be included optionally
- No authentication or session logic is implemented, as per requirement

---

## PATCH /users/:id ✅

- Supports partial updates
- Only the fields provided in the request body are updated

---

## PUT /users/:id/profile ✅

- Creates a profile if it does not exist
- Updates the profile if it already exists

---

## DELETE /users/:id ✅

- Deletes the user
- Associated profile data is handled correctly

============================================================

## SETUP INSTRUCTIONS

Follow the steps below to run the project locally.

```bash
git clone <your-forked-repository-url>
cd <project-folder>
npm install
node server.js

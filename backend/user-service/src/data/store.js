// Simple in-memory data store for the User Service.
// Swappable later for PostgreSQL without changing the service/controller layer contract.

let nextId = 1;
const users = []; // { id, name, email, passwordHash }
const sessions = new Map(); // token -> userId

function findByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function createUser({ name, email, passwordHash }) {
  const user = { id: nextId++, name, email, passwordHash };
  users.push(user);
  return user;
}

function createSession(token, userId) {
  sessions.set(token, userId);
}

function getUserIdBySession(token) {
  return sessions.get(token);
}

module.exports = { findByEmail, createUser, createSession, getUserIdBySession };

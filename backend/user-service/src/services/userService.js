const store = require('../data/store');
const { hashPassword, verifyPassword, generateToken } = require('../utils/auth');

function register({ name, email, password }) {
  if (!name || !email || !password) {
    const err = new Error('"name", "email" and "password" are all required.');
    err.status = 400;
    throw err;
  }

  if (store.findByEmail(email)) {
    const err = new Error(`A user with email "${email}" already exists.`);
    err.status = 409;
    throw err;
  }

  const passwordHash = hashPassword(password);
  const user = store.createUser({ name, email, passwordHash });

  return { id: user.id, name: user.name, email: user.email };
}

function login({ email, password }) {
  if (!email || !password) {
    const err = new Error('"email" and "password" are both required.');
    err.status = 400;
    throw err;
  }

  const user = store.findByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    const err = new Error('Invalid email or password.');
    err.status = 401;
    throw err;
  }

  const token = generateToken();
  store.createSession(token, user.id);

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

module.exports = { register, login };

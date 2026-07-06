const crypto = require('crypto');

// Hash a plain-text password using scrypt with a random salt.
// Stored format: "<salt>:<hash>" so we don't need extra columns/fields.
function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(plainPassword, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(plainPassword, storedHash) {
  const [salt, hash] = storedHash.split(':');
  const candidateHash = crypto.scryptSync(plainPassword, salt, 64).toString('hex');
  const candidateBuffer = Buffer.from(candidateHash, 'hex');
  const storedBuffer = Buffer.from(hash, 'hex');

  if (candidateBuffer.length !== storedBuffer.length) return false;
  return crypto.timingSafeEqual(candidateBuffer, storedBuffer);
}

// Simple opaque session token (not JWT) - good enough for a basic auth flow.
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = { hashPassword, verifyPassword, generateToken };

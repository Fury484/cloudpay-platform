const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

async function registerUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;

  const values = [email, hashedPassword];
  const result = await pool.query(query, values);

  return result.rows[0];
}

async function loginUser(email, password) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email
    }
  };
}

module.exports = {
  registerUser,
  loginUser
};
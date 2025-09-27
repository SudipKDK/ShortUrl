import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export const setUser = (id, user) => {
  return jwt.sign(
    {
      _id: id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return null;
  }
};

export const generateRefreshToken = (id) => {
  return jwt.sign(
    { _id: id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

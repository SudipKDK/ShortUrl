import jwt from "jsonwebtoken";
const secret = "MySecret123#";

// const sessionIdToUserMap =new Map();

export const setUser = (id, user) => {
  // sessionIdToUserMap.set(id,user);

  return jwt.sign(
    {
      _id: id,
      email: user.email,
    },
    secret
  );
};
export const getUser = (token) => {
  // return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

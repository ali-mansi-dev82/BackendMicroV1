const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashPassword(password) {
  return hashSync(password, process.env.SALT_SYNC);
}
function comparePassword(password, hashed) {
  return compareSync(password, hashed);
}
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1y",
    algorithm: "HS512",
  });
}
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
function decodeToken(token) {
  return jwt.decode(token);
}
module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
  decodeToken,
};

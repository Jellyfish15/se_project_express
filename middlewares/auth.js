const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/customErrors");

module.exports = (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    console.log("No token provided");
    return next(new UnauthorizedError("Authorization required"));
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log("Token verification failed:", err.message, token);
    return next(new UnauthorizedError("Authorization required"));
  }

  req.user = payload;
  return next();
};

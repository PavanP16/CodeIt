const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
  try {
    const payload = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
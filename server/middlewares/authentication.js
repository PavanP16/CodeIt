const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Token = require("../models/Token");
const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
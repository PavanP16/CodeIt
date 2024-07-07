const User = require("../models/User");
const Token = require("../models/Token");
const CustomError = require("../errors");
const crypto = require("crypto");
const { ORIGIN } = require("../config");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils/jwt");
const createHash = require("../utils/createHash");
const createTokenUser = require("../utils/createTokenUser");

const register = async (req, res) => {

  const { email, username, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email already exists!" });
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
   return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Username already exists!" });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid user data!" });
  }


  const tokenUser = createTokenUser(user);
  let refreshToken = "";

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  return res.status(StatusCodes.OK).json({ user: tokenUser, message: "Your account has been registered" });

};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email and password!" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Credentials!" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Credentials!" });
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = "";

  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid Credentials!" });
    }

    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    return res.status(StatusCodes.OK).json({ user: tokenUser });
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(StatusCodes.OK).json({ msg: "Logged out!!" });
};





module.exports = {
  register,
  login,
  logout,
};
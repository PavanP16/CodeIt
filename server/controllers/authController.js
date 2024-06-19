const User = require("../models/User");
const Token = require("../models/Token");
const CustomError = require("../errors");
const crypto = require("crypto");
const { ORIGIN } = require("../config");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils/jwt");
const createHash = require("../utils/createHash");

const register = async (req, res) => {
  const { email, username, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists)
    throw new CustomError.BadRequestError("Email already exists!");

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    username,
    email,
    password,
    verificationToken,
  });

  if(!user) throw new CustomError.BadRequestError("User not created!");

  res.status(StatusCodes.OK).json({
    msg: "Your account has been created successfully!",
  });
};



const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new CustomError.BadRequestError("Please provide email and password!");

  const user = await User.findOne({ email });
  if (!user)
    throw new CustomError.UnauthenticatedError("Email does not exist!");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError("Invalid password!");

  const tokenUser = createTokenUser(user);
  let refreshToken = "";

  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid)
      throw new CustomError.UnauthenticatedError("Invalid Credentials!");

    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
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
  res.status(StatusCodes.OK).json({ msg: "Logged out!!" });
};



module.exports = {
  register,
  login,
  logout,
};
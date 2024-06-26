const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
} = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select("-password");
  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No user found with username: ${req.params.username}` });
    throw new CustomError.NotFoundError(
      `No user found with username: ${req.params.username}`
    );
  }
  // checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateSkills = async (req, res) => {

  const { skills } = req.body;
  if (!skills) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide skills!" });
    throw new CustomError.BadRequestError("Please provide skills!");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.skills = skills;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Updated skills successfully!" });

}

const getSkills = async (req, res) => {

  const user = await User.findOne({ _id: req.user.userId });
  
  res.status(StatusCodes.OK).json({ skills: user.skills });

}

const updateUser = async (req, res) => {
  const { email, username } = req.body;
  if (!email && !username) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email or username!" });
    throw new CustomError.BadRequestError("Please provide email or username!");
  }

  //Check if email or username already exists

  // const emailExists = await User.findOne({ email
  // });
  // if (emailExists) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "Email already exists!" });
  //   throw new CustomError.BadRequestError("Email already exists!");
  // }
  // const usernameExists = await User.findOne({ username });

  // if (usernameExists) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "Username already exists!" });
  //   throw new CustomError.BadRequestError("Username already exists!");
  // }


  const user = await User.findOne({ _id: req.user.userId });
  if (email) user.email = email;
  if (username) user.username = username;
  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide old and new passwords!" });
    throw new CustomError.BadRequestError(
      "Please provide old and new passwords!"
    );
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Credentials!" });
    throw new CustomError.UnauthenticatedError("Invalid Credentials!");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Updated password successfully!" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  updateSkills,
  getSkills,
};
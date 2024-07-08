const User = require("../models/User");
const Submission = require("../models/Submission");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
} = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");
const Problem = require("../models/Problem");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  return res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select("-password");
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No user found with username: ${req.params.username}` });
  }

  const userId = req.user.userId;
  try {
    const submissions = await Submission.find({
      userId,
      status: "accepted",
    })
      .sort({ createdAt: -1 })
      .limit(4)
      .exec();

    const acceptedcount = await Submission.countDocuments({
      userId,
      status: "accepted"
    });

    const totalCount = await Submission.countDocuments({
      userId,
    });

    const problemsCount = await Problem.countDocuments({});

    const codingScore = acceptedcount / totalCount * 100;

    const allUsers = await User.find().sort({ score: -1 });

    const userPosition = allUsers.findIndex(user => user._id.toString() === userId);
    const result = await Submission.aggregate([
      {
        $match: { userId } // Match submissions for the specified userId
      },
      {
        $group: {
          _id: { userId: "$userId", problemId: "$problemId" },
          count: { $sum: 1 } // Count unique combinations of userId and problemId
        }
      },
      {
        $group: {
          _id: "$_id.userId",
          solvedProblemCount: { $sum: 1 } // Count distinct problemIds for each user
        }
      }
    ]);

    if (result.length > 0) {
      return res.status(StatusCodes.OK).json({ user, submissions, solvedProblems: result[0].solvedProblemCount, totalCount, acceptedcount, problemsCount, codingScore, pos: userPosition + 1 });
    } else {
      return res.status(StatusCodes.OK).json({ user, submissions, solvedProblems: 0, totalCount, acceptedcount, problemsCount, codingScore, });
    }

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const showCurrentUser = async (req, res) => {
  return res.status(StatusCodes.OK).json({ user: req.user });
};

const updateSkills = async (req, res) => {

  const { skills } = req.body;
  if (!skills) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide skills!" });
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.skills = skills;
  await user.save();
  return res.status(StatusCodes.OK).json({ msg: "Updated skills successfully!" });

}

const getSkills = async (req, res) => {

  const user = await User.findOne({ _id: req.user.userId });

  return res.status(StatusCodes.OK).json({ skills: user.skills });

}

const updateUser = async (req, res) => {
  const { email, username } = req.body;
  if (!email && !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email or username!" });
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
  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide old and new passwords!" });

  }
  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Credentials!" });
  }
  user.password = newPassword;
  await user.save();
  return res.status(StatusCodes.OK).json({ msg: "Updated password successfully!" });
};


const getLeaderboard = async (req, res) => {

  try {
    const usersWithSubmissionCounts = await User.aggregate([
      {
        $lookup: {
          from: "submissions",
          localField: "_id",
          foreignField: "userId",
          as: "submissions"
        }
      },
      {
        $addFields: {
          submissionCount: { $size: "$submissions" }
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          score: 1,
          submissionCount: 1
        }
      },
      {
        $sort: { score: -1 }
      }
    ]);

    return res.status(StatusCodes.OK).json({ users: usersWithSubmissionCounts });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  getLeaderboard,
  updateUser,
  updateUserPassword,
  updateSkills,
  getSkills,
};
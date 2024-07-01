const { StatusCodes } = require("http-status-codes");
const Problem = require("../models/Problem");

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.status(StatusCodes.OK).json({ problems });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};


const getProblemBySlug = async (req, res) => {
  try {
    const problem = await Problem.find({ slug: req.params.slug });
    return res.status(StatusCodes.OK).json({ problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    return res.status(StatusCodes.OK).json({ problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};




module.exports = {
  getAllProblems,
  getProblemBySlug,
  getProblemById,
};
const { StatusCodes } = require("http-status-codes");
const Problem = require("../models/Problem");
const { saveFileToFirebase } = require("../firebase/saveToFirebase");

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    return res.status(StatusCodes.OK).json({ problems });
  } catch (error) {
    return res
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


const createProblem = async (req, res) => {
  try {
    const {
      slug,
      description,
      title,
      difficulty,
      constraints,
      tags,
      siteCases,
    } = req.body;
    const { input, cppoutput, javaoutput, pythonoutput } = req.files;

    if (!input && !cppoutput && !javaoutput && !pythonoutput) {
      return res
        .status(400)
        .json({ message: "Input and Output files are required" });
    }

    const inputFilePath = await saveFileToFirebase(
      "testinputs",
      "txt",
      input[0].buffer
    );

    const cppOutputFilePath = await saveFileToFirebase(
      "cppoutputs",
      "txt",
      cppoutput[0].buffer
    );
    const javaOutputFilePath = await saveFileToFirebase(
      "javaoutputs",
      "txt",
      javaoutput[0].buffer
    );
    const pythonOutputFilePath = await saveFileToFirebase(
      "pythonoutputs",
      "txt",
      pythonoutput[0].buffer
    );

    const output = [
      {
        cpp: cppOutputFilePath,
        java: javaOutputFilePath,
        python: pythonOutputFilePath,
      },
    ];

    const problem = new Problem({
      input: inputFilePath,
      output: [...output],
      tags,
      siteCases,
      slug,
      description,
      title,
      difficulty,
      constraints,
      createdBy: req.user.userId,
    });

    await problem.save();

    return res.status(StatusCodes.CREATED).json({ problem });
  } catch (error) {
    console.error("Error in creating problem:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create problem",
      error: error.message,
    });
  }
};




module.exports = {
  getAllProblems,
  getProblemBySlug,
  getProblemById,
  createProblem,
};
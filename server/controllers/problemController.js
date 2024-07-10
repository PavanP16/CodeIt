const { StatusCodes } = require("http-status-codes");
const Problem = require("../models/Problem");
const { saveFileToFirebase } = require("../firebase/saveToFirebase");
const Submission = require("../models/Submission");

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

    console.log(req.body);

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


const editProblem = async (req, res) => {
  try {
    const {
      slug,
      description,
      title,
      difficulty,
      constraints,
      timelimit,
      tags,
      testCases,
    } = req.body;

    console.log(req.body);


    console.log(req.params);
    const id = req.params.id;

    // Ensure an ID is provided
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Problem ID is required" });
    }

    // Prepare update data object
    const updateData = {};
    updateData.createdBy = req.user.userId;

    // Find the existing problem by ID
    let existingProblem = await Problem.findById(id);
    // Handle case where problem does not exist
    if (!existingProblem) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Problem not found" });
    }

    // Update fields if provided in request body
    if (testCases) updateData.testCases = testCases;
    if (slug) updateData.slug = slug;
    if (description) updateData.description = description;
    if (title) updateData.title = title;
    if (difficulty) updateData.difficulty = difficulty;
    if (constraints) updateData.constraints = constraints;
    if (tags) updateData.tags = tags;
    if (timelimit) updateData.timelimit = timelimit;

    existingProblem = await Problem.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res
      .status(StatusCodes.OK)
      .json({ problem: existingProblem, message: "Problem updated!" });
  } catch (error) {
    console.error("Error editing problem:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to update problem" });
  }
};

const deleteProblem = async (req, res) => {
  // delete based on id
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await Problem.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({ message: "Problem deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};




module.exports = {
  getAllProblems,
  getProblemBySlug,
  getProblemById,
  createProblem,
  editProblem,
  deleteProblem,
};
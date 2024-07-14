const { generateInputFile } = require("../generateInputFile");
const { generateFile } = require("../generateFile");
const { validatePythonTestCases, executePython } = require("../validatePythonTestCases");
const { validateJavaTestCases, executeJava } = require("../validateJavaTestCases");
const { validateCppTestCases, executeCpp } = require("../validateCppTestCases");
const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const { downloadTestInputsFromFirebase } = require("../firebase/getDataFromFirebase");
const User = require("../models/User");

const runCode = async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    let output;
    if (language === "cpp") output = await executeCpp(filePath, inputPath, 5);
    else if (language === "java")
      output = await executeJava(filePath, inputPath, 5);
    else if (language === "python")
      output = await executePython(filePath, inputPath, 5);
    return res.json({ filePath, inputPath, output });
  } catch (error) {
    return res.status(500).json({ error: error.message, stderr: error.stderr });
  }
};




const submitCode = async (req, res) => {
  let { language, code, problemId } = req.body;

  const userId = req.user.userId;


  if (code === undefined || !code) {
    return res.status(400).json({ error: "Empty code body!" });
  }

  try {
    const filepath = await generateFile(language, code);
    let output;

    const problem = await Problem.findById(problemId);
    if (!problem)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No problem found!" });

    const timelimit = problem.timelimit;
    const expectedOutputPath = problem.output;
    const inputPath = await downloadTestInputsFromFirebase(problem.input);


    if (language === "cpp") {
      output = await validateCppTestCases(
        filepath,
        inputPath,
        expectedOutputPath[0].cpp,
        timelimit
      );
    }
    else if (language === "java")
      output = await validateJavaTestCases(
        filepath,
        inputPath,
        expectedOutputPath[0].java,
        timelimit
      );
    else if (language === "python")
      output = await validatePythonTestCases(
        filepath,
        inputPath,
        expectedOutputPath[0].python,
        timelimit
      );



    const submission = new Submission({
      code,
      language,
      status: output,
      problemId,
      userId,
    });

    await submission.save();

    problem.Submissions += 1
    problem.save();


    if (problem.solvedBy.includes(userId)) {
      return res.json({ filepath, inputPath, output });
    }

    if (output === "accepted") {
      console.log("Output accepted, updating problem and user...");

      await Problem.findByIdAndUpdate(problem._id, {
        $push: { solvedBy: userId }
      });
      console.log("User added to solvedBy array:", problem.solvedBy);

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("User found:", user);

      let scoreIncrement;
      switch (problem.difficulty) {
        case "Hard":
          scoreIncrement = 80;
          break;
        case "Medium":
          scoreIncrement = 50;
          break;
        default:
          scoreIncrement = 30;
      }

      user.score += scoreIncrement;
      await user.save();
      console.log("User score updated:", user.score);

      return res.json({ filepath, inputPath, output, score: user.score });
    }

    return res.json({ filepath, inputPath, output });

  } catch (err) {
    const submission = new Submission({
      userId: req.user.userId,
      problemId,
      language,
      code,
      status: "rejected",
    });

    await submission.save();

    const problem = await Problem.findById(problemId);
    problem.Submissions += 1
    await problem.save();
    return res.status(500).json(err);
  }
};


module.exports = {
  runCode,
  submitCode,
};
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
      userId: req.user.userId,
    });

    await submission.save();

    problem.Submissions += 1
    problem.save();

    if (output === "accepted") {

      if (problem.solvedBy.includes(req.user.userId)) return res.json({ filepath, inputPath, output });

      else {
        problem.solvedBy.push(req.user.userId);
        await problem.save();
        const user = await User.findById(req.user.userId);
        console.log(user)
        console.log(req.user);
        if (problem.difficulty === "Hard") {
          user.score += 80
          user.save()
        } else if (problem.difficulty === "Medium") {
          user.score += 50
          user.save();
        } else {
          user.score += 30
          user.save();
        }

        return res.json({ filepath, inputPath, output });
      }
    }
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
    problem.save();
    return res.status(500).json(err);
  }
};


module.exports = {
  runCode,
  submitCode,
};
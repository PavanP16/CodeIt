const router = require("express").Router(); //Used to create the API's routes
const {
  runCode,
  submitCode,
} = require("../controllers/codeController");
const { authenticateUser } = require("../middlewares/authentication");

router.post("/run", authenticateUser, runCode);

router.post("/submit", authenticateUser, submitCode);


module.exports = router;
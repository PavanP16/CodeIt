const {
    getAllProblems,
    getProblemById,
    getProblemBySlug,
    createProblem,
} = require("../controllers/problemController");
const upload = require("../multer/upload");
const { authenticateUser } = require("../middlewares/authentication");


const router = require("express").Router();

router.route("/").get(authenticateUser,getAllProblems).post(
    authenticateUser,
    upload.fields([
        { name: "input", maxCount: 1 },
        { name: "cppoutput", maxCount: 1 },
        { name: "pythonoutput", maxCount: 1 },
        { name: "javaoutput", maxCount: 1 },
    ]),
    createProblem
);;


router.route("/:slug").get(authenticateUser,getProblemBySlug);

router.route("/prob/:id").get(authenticateUser,getProblemById)


module.exports = router;
const {
    getAllProblems,
    getProblemById,
    getProblemBySlug,
} = require("../controllers/problemController");


const router = require("express").Router();

router.route("/").get(getAllProblems);


router.route("/:slug").get(getProblemBySlug);

router.route("/:id").get(getProblemById)


module.exports = router;
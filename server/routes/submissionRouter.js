const router = require("express").Router();
const {
    getAllSubmissions,
    getUserSubmissions,
    deleteSubmission,
    getSingleSubmission,
    retrieveLastSubmittedCode,
    getUserStats,
} = require("../controllers/submissionController");
const {
    authenticateUser,
} = require("../middlewares/authentication");

router.post(
    "/problem/:problemId/latestSubmission",
    authenticateUser,
    retrieveLastSubmittedCode
);

router
    .route("/")
    .get(
        authenticateUser,
        getAllSubmissions
    )

router.route('/user').get(authenticateUser, getUserSubmissions);
router.route('/stats').get(authenticateUser, getUserStats);

router
    .route("/:id")
    .get(authenticateUser, getSingleSubmission)
    .delete(
        authenticateUser,
        deleteSubmission
    );

module.exports = router;

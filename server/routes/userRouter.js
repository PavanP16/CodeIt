const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAllUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  getSingleUser,
  updateSkills,
  getSkills,
  getLeaderboard
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/leaderboard").get(authenticateUser, getLeaderboard);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateSkills").patch(authenticateUser, updateSkills);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:username").get(authenticateUser, getSingleUser);
router.route("/r/getSkills").get(authenticateUser, getSkills);

module.exports = router;
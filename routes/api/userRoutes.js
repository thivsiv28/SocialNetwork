const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// import crate usres method from the user controller i just created
// const {
//   getStudents,
//   getSingleStudent,
//   createStudent,
//   deleteStudent,
//   addAssignment,
//   removeAssignment,
// } = require("../../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", removeFriend);
// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

// // /api/students/:studentId
// router.route("/:studentId").get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route("/:studentId/assignments").post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route("/:studentId/assignments/:assignmentId").delete(removeAssignment);

module.exports = router;

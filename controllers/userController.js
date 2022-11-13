const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

//createusrs async and must accept req and res as parameters

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body);
    await getUserById(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addFriend = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    user = await User.findById(req.params.userId);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    user = await User.findById(req.params.userId);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};

// module.exports = {
//   // Get all students
//   getStudents(req, res) {
//     Student.find()
//       .then(async (students) => {
//         const studentObj = {
//           students,
//           headCount: await headCount(),
//         };
//         return res.json(studentObj);
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Get a single student
//   getSingleStudent(req, res) {
//     Student.findOne({ _id: req.params.studentId })
//       .select("-__v")
//       .then(async (student) =>
//         !student
//           ? res.status(404).json({ message: "No student with that ID" })
//           : res.json({
//               student,
//               grade: await grade(req.params.studentId),
//             })
//       )
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // create a new student
//   createStudent(req, res) {
//     Student.create(req.body)
//       .then((student) => res.json(student))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Delete a student and remove them from the course
//   deleteStudent(req, res) {
//     Student.findOneAndRemove({ _id: req.params.studentId })
//       .then((student) =>
//         !student
//           ? res.status(404).json({ message: "No such student exists" })
//           : Course.findOneAndUpdate(
//               { students: req.params.studentId },
//               { $pull: { students: req.params.studentId } },
//               { new: true }
//             )
//       )
//       .then((course) =>
//         !course
//           ? res.status(404).json({
//               message: "Student deleted, but no courses found",
//             })
//           : res.json({ message: "Student successfully deleted" })
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Add an assignment to a student
//   addAssignment(req, res) {
//     console.log("You are adding an assignment");
//     console.log(req.body);
//     Student.findOneAndUpdate(
//       { _id: req.params.studentId },
//       { $addToSet: { assignments: req.body } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//               .status(404)
//               .json({ message: "No student found with that ID :(" })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Remove assignment from a student
//   removeAssignment(req, res) {
//     Student.findOneAndUpdate(
//       { _id: req.params.studentId },
//       { $  : { assignment: { assignmentId: req.params.assignmentId } } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//               .status(404)
//               .json({ message: "No student found with that ID :(" })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };

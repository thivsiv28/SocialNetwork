const { Thought, User } = require("../models");

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought.id } },
      { runValidators: true, new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    let thought = await Thought.findOneAndUpdate(
      { id: req.params.id },
      req.body
    );

    thought = await Thought.findById(req.params.id);
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.id });
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addReaction = async (req, res) => {
  try {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    const thought = await Thought.findById(req.params.thoughtId);
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const removeReaction = async (req, res) => {
  try {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    );

    const thought = await Thought.findById(req.params.thoughtId);
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
// module.exports = {
//   // Get all courses
//   getCourses(req, res) {
//     Course.find()
//       .then((courses) => res.json(courses))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Get a course
//   getSingleCourse(req, res) {
//     Course.findOne({ _id: req.params.courseId })
//       .select("-__v")
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: "No course with that ID" })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a course
//   createCourse(req, res) {
//     Course.create(req.body)
//       .then((course) => res.json(course))
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Delete a course
//   deleteCourse(req, res) {
//     Course.findOneAndDelete({ _id: req.params.courseId })
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: "No course with that ID" })
//           : Student.deleteMany({ _id: { $in: course.students } })
//       )
//       .then(() => res.json({ message: "Course and students deleted!" }))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Update a course
//   updateCourse(req, res) {
//     Course.findOneAndUpdate(
//       { _id: req.params.courseId },
//       { $set: req.body },
//       { runValidators: true, new: true }
//     )
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: "No course with this id!" })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };

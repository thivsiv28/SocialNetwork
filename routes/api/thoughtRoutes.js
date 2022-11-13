const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

const router = require("express").Router();

router.get("/", getAllThoughts);
router.post("/", createThought);
router.get("/:id", getThoughtById);
router.put("/:id", updateThought);
router.delete("/:id", deleteThought);
module.exports = router;

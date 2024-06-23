const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const tutorialController = require("../controllers/tutorialController.js");
const { check } = require("express-validator");

// Get all tutorials;
router.get("/", tutorialController.findAll);

// create a new tutorial
router.post("/", auth, tutorialController.createTutorial);

// Get single tutorial
// router.get("/:id", tutorialController.findOne); // will check


// Update tutorial
router.put(
  "/:id",
  auth,
  tutorialController.update
);
router.delete("/:id", auth,  tutorialController.delete);
module.exports = router;

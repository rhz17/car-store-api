const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

// Return all
router.get("/", carController.get);

// Return with filter ID
router.get("/:id", carController.getByID);

// Update with filter ID
router.put("/:id", carController.put);

// Delete with filter ID
router.delete("/:id", carController.delete);

// Create new record
router.post("/", carController.post);

module.exports = router;

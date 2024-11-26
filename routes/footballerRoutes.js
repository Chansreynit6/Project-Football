const express = require("express");
const router = express.Router();
const footballerController = require("../Controllers/footballerController");
const { protect, adminOnly } = require('../Modelware/authmodelware');

router.post("/create", protect, adminOnly, footballerController.createFootballer);
router.get("/getAll", protect, footballerController.getAllFootballers);
router.get("/:id", protect, footballerController.getFootballerById);
router.put("/:id", protect, adminOnly, footballerController.updateFootballer);
router.delete("/:id", protect, adminOnly, footballerController.deleteFootballer);

module.exports = router;

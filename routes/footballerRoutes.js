const express = require("express");
const router = express.Router();
const footballerController = require("../Controllers/footballerController");

router.post("/create", footballerController.createFootballer);
router.get("/getAll", footballerController.getAllFootballers);
router.get("/:id", footballerController.getFootballerById);
router.put("/:id", footballerController.updateFootballer);
router.delete("/:id", footballerController.deleteFootballer);

module.exports = router;


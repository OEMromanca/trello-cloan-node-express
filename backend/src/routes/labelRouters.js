const { Router } = require("express");

const authenticateUser = require("../middlewares/authenticateUser");
const {
  createLabel,
  getUserLabels,
  deleteLabel,
  editLabel,
  getLabelById,
} = require("../controllers/labelController");

const labelRouter = Router();

labelRouter.post("/create-label", authenticateUser, createLabel);
labelRouter.get("/", authenticateUser, getUserLabels);
labelRouter.delete("/delete-label/:labelId", authenticateUser, deleteLabel);
labelRouter.put("/edit-label/:labelId", authenticateUser, editLabel);
labelRouter.get("/get-label/:labelId", authenticateUser, getLabelById);

module.exports = { labelRouter };

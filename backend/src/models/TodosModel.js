const mongoose = require("../db");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  labelId: {
    type: String,
    required: true,
    trim: true,
  },
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;

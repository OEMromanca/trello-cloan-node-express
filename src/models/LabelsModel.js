const mongoose = require("../db");

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const LabelModel = mongoose.model("Label", labelSchema);

module.exports = LabelModel;

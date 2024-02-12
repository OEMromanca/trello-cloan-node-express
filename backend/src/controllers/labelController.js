const LabelModel = require("../models/LabelsModel");
const UserModel = require("../models/UserModel");

async function createLabel(req, res) {
  try {
    const { name, color } = req.body;
    const userId = req.user._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const label = new LabelModel({ name, color, createdBy: userId });
    await label.save();

    console.log(label);

    user.labels = user.labels || [];
    user.labels.push(label);
    await user.save();

    const savedLabel = await LabelModel.findById(label._id);

    res.status(201).json({ label: savedLabel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserLabels(req, res) {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).populate("labels");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ labels: user.labels });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteLabel(req, res) {
  try {
    const labelId = req.params.labelId;
    const userId = req.user._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.labels && user.labels.length > 0) {
      user.labels = user.labels.filter(
        (label) => label && label._id !== labelId
      );
    }

    await user.save();

    const deletedLabel = await LabelModel.findByIdAndDelete(labelId);

    if (!deletedLabel) {
      return res.status(404).json({ error: "Label not found" });
    }

    res
      .status(200)
      .json({ message: "Label deleted successfully", label: deletedLabel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function editLabel(req, res) {
  try {
    const labelId = req.params.labelId;
    const userId = req.user._id;
    const { name } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.labels.includes(labelId)) {
      return res.status(403).json({ error: "Unauthorized to edit this label" });
    }

    const label = await LabelModel.findById(labelId);
    if (!label) {
      return res.status(404).json({ error: "Label not found" });
    }

    label.name = name || label.name;

    const savedLabel = await label.save();

    res
      .status(200)
      .json({ message: "Label updated successfully", label: savedLabel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getLabelById(req, res) {
  try {
    const labelId = req.params.labelId;
    const label = await LabelModel.findById(labelId);

    if (!label) {
      return res.status(404).json({ error: "Label not found" });
    }

    res.status(200).json({ label });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createLabel,
  getUserLabels,
  deleteLabel,
  editLabel,
  getLabelById,
};

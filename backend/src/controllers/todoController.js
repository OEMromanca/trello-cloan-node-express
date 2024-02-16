const LabelModel = require("../models/LabelsModel");
const TodoModel = require("../models/TodosModel");
const UserModel = require("../models/UserModel");

async function getUserTodosByLabelId(req, res) {
  try {
    const userId = req.user._id;
    const labelId = req.params.labelId;

    const label = await LabelModel.findById(labelId);

    if (!label) {
      return res.status(404).json({ error: "Label not found" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todosWithLabel = await TodoModel.find({
      createdBy: userId,
      labelId: labelId,
    });

    res.status(200).json({ todos: todosWithLabel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const createTodo = async (req, res) => {
  try {
    const { labelId, title } = req.body;
    const userId = req.user._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const label = labelId ? await LabelModel.findById(labelId) : null;

    if (labelId && !label) {
      return res.status(404).json({ error: "Label not found" });
    }

    const todo = new TodoModel({
      labelId,
      title,
      createdBy: userId,
    });
    await todo.save();

    user.todos = user.todos || [];
    user.todos.push(todo);
    await user.save();

    if (label) {
      label.todos = label.todos || [];
      label.todos.push(todo);
      await label.save();
    }

    const savedTodo = await TodoModel.findById(todo._id);

    res.status(201).json({ todo: savedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.user._id;

    const todo = await TodoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (todo.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const labelId = todo.labelId;
    const label = labelId ? await LabelModel.findById(labelId) : null;

    await TodoModel.findByIdAndDelete(todoId);

    const user = await UserModel.findById(userId);
    user.todos = user.todos.filter((id) => id.toString() !== todoId);

    await user.save();

    if (label) {
      label.todos = label.todos.filter((id) => id.toString() !== todoId);
      await label.save();
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function editTodo(req, res) {
  try {
    const todoId = req.params.todoId;
    const userId = req.user._id;
    const { title } = req.body;

    console.log(todoId, "TODOID");

    const todo = await TodoModel.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    console.log(todo, "TODO");

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.todos.includes(todoId)) {
      return res.status(403).json({ error: "Unauthorized to edit this todo" });
    }

    todo.title = title || todo.title;

    const savedTodo = await todo.save();

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: savedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTodoById(req, res) {
  try {
    const todoId = req.params.todoId;
    const todo = await TodoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUserTodosByLabelId,
  createTodo,
  deleteTodo,
  editTodo,
  getTodoById,
};

const { Router } = require("express");

const authenticateUser = require("../middlewares/authenticateUser");
const {
  getUserTodosByLabelId,
  createTodo,
  deleteTodo,
  editTodo,
  getTodoById,
} = require("../controllers/todoController");

const todoRouter = Router();

todoRouter.post("/create-todo", authenticateUser, createTodo);
todoRouter.get("/:labelId", authenticateUser, getUserTodosByLabelId);
todoRouter.delete("/delete-todo/:todoId", authenticateUser, deleteTodo);
todoRouter.put("/edit-todo/:todoId", authenticateUser, editTodo);
todoRouter.get("/get-todo/:todoId", authenticateUser, getTodoById);

module.exports = { todoRouter };

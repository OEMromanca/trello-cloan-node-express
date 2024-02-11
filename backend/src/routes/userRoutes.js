const { Router } = require("express");
const {
  getUsers,
  loginUser,
  registerUser,
  logoutUser,
  userProfile,
  requestPasswordReset,
  resetPassword,
  assignRoleToUser,
  deleteUser,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../middlewares/authenticateUser");

const userRouter = Router();

userRouter.get("/", authenticateUser, authorizeUser(["admin"]), getUsers);
userRouter.delete("/:id", deleteUser);
userRouter.post("/assign-role", assignRoleToUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authenticateUser, logoutUser);
userRouter.get("/profile", authenticateUser, userProfile);
userRouter.post("/reset-password-request", requestPasswordReset);
userRouter.post("/reset-password/:userId/:token", resetPassword);

module.exports = { userRouter };

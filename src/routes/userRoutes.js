const { Router } = require('express');
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
  editUser,
} = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeUser = require('../middlewares/authorizeUser');
const csrfMiddleware = require('../middlewares/csrfMiddleware');

const userRouter = Router();

userRouter.get('/', authenticateUser, authorizeUser(['admin']), getUsers);
userRouter.delete('/delete-user/:id', deleteUser, authenticateUser);
userRouter.post('/assign-role', assignRoleToUser, authorizeUser(['admin']), csrfMiddleware );
userRouter.post('/register', registerUser);
userRouter.post('/login', csrfMiddleware, loginUser);
userRouter.post('/logout', authenticateUser, logoutUser);
userRouter.get(
  '/profile',
  authenticateUser,
  authorizeUser(['admin', 'user']),
  userProfile,csrfMiddleware
);
userRouter.post('/reset-password-request', requestPasswordReset);
userRouter.post('/reset-password/:userId/:token', resetPassword);
userRouter.put(
  '/edit-user/:id',
  authenticateUser,
  authorizeUser(['admin']),
  editUser
);

module.exports = { userRouter };

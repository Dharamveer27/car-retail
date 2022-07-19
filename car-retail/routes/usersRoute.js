import { Router } from 'express';
import { login } from '../controlers/authControler.js';
import { addUser, addUserinBulk, deleteUser, updateUser } from '../controlers/adminControler.js';
import { isAdmin, verifyToken } from '../middleware/authJWT.js';
import validationErrorHandler from '../middleware/validationErrorHandler.js';
import { loginValidation } from '../utils/utils.js';
import { getUsers } from '../middleware/helper.js';
import { changePassword } from '../controlers/buyerControler.js';

const usersRouter = Router();


usersRouter.get('/', verifyToken, getUsers);
usersRouter.put('/password', verifyToken, changePassword)
usersRouter.post('/admin/user', verifyToken, isAdmin, addUser)
usersRouter.post('/admin/users', verifyToken, isAdmin, addUserinBulk)
usersRouter.put('/admin/:id', verifyToken, isAdmin, updateUser)
usersRouter.delete('/admin/:id', verifyToken, isAdmin, deleteUser)
usersRouter.post('/login', loginValidation, validationErrorHandler, login)

export default usersRouter;

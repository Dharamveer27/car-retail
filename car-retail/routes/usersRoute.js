import { Router } from 'express';
import { login } from '../controlers/authControler.js';
import { addUser, addUserinBulk, deleteUser, updateUser } from '../controlers/adminControler.js';
import { isAdmin, verifyToken } from '../middleware/authJWT.js';
import validationErrorHandler from '../middleware/validationErrorHandler.js';
import { loginValidation } from '../utils/utils.js';
import { getUsers } from '../middleware/helper.js';
import { changePassword, buyRequest } from '../controlers/buyerControler.js';

const usersRouter = Router();

//api to GET list of users
usersRouter.get('/', verifyToken, getUsers);
//api to reset password
usersRouter.put('/password', verifyToken, changePassword)
//api to add User
usersRouter.post('/admin/user', verifyToken, isAdmin, addUser)
// api to add users using csv file
usersRouter.post('/admin/users', verifyToken, isAdmin, addUserinBulk)
//api to update user by id
usersRouter.put('/admin/:id', verifyToken, isAdmin, updateUser)
//api to delete user by id
usersRouter.delete('/admin/:id', verifyToken, isAdmin, deleteUser)
// api to login user and generate auth token
usersRouter.post('/login', loginValidation, validationErrorHandler, login)
//api to create buy request
usersRouter.post('/buyer/car/:id', verifyToken, buyRequest);
export default usersRouter;

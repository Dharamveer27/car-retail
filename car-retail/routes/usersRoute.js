import { Router } from 'express';
import { login } from '../controlers/authControlers.js';
import { addUser } from '../controlers/userControlers.js';
import { isAdmin, verifyToken } from '../middleware/authJWT.js';
const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
usersRouter.post('/addUser', verifyToken, isAdmin, addUser)
usersRouter.post('/login', login)

export default usersRouter;

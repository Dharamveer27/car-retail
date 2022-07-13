import { Router } from 'express';
import { signIn, signUp } from '../controlers/auth.controlers.js';
const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
usersRouter.post('/register', signUp)
usersRouter.post('/login', signIn)

export default usersRouter;

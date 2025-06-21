import express from 'express';
import { getUser, createUser, deleteUser, updateUser, loginUser } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/',
    getUser
)

userRouter.post('/login',
    loginUser
)

userRouter.post('/',
    createUser
)

userRouter.delete('/',
    deleteUser
)

userRouter.put('/',
    updateUser
)

export default userRouter;
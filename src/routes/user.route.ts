import express from 'express';
import { deleteUser, getUsers, updateUser } from '../controllers/user';
import isAuth from '../middleware/auth';

const router = express.Router();

router.get('/', isAuth, getUsers);
router.put('/update-user/:id', isAuth, updateUser);
router.delete('/remove-user/:id', isAuth, deleteUser);

export default router;
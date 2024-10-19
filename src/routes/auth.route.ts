import express from 'express';
import { loginUser, register, logout } from '../controllers/auth';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', register);
router.post('/logout', logout);

export default router;
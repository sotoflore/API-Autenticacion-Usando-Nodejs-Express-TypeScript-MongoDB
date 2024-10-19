import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from "./database/connectDatabase";
import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';

dotenv.config();

//conectar DB
connectDB();

const server = express();

server.use(express.json());
server.use(cors());
server.use(cookieParser());

//Rutas
server.use('/api/auth', authRoute);
server.use('/api/users', userRoute);

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log(`Server conectado en el ${PORT}`)
})
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.model";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validación de campos requeridos
    if (!email || !password) {
        res.status(400).json({ message: "Please provide both email and password" });
        return;
    }

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        // Generar el token JWT
        const token = jwt.sign({ email, username: user.username }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        // Enviar el token como cookie HTTP-only
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Responder con el nombre de usuario y el email
        res.status(200).json({ message: "User logged in successfully", user: { email: user.email, username: user.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const register = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    // Verificación de campos requeridos
    if (!email || !password || !username) {
        res.status(400).json({ message: "Please provide all fields" });
        return; 
    }

    try {
        // Verificación si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hashear el password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creación del nuevo usuario
         await User.create({ email, password: hashedPassword, username });

        // Generar el token JWT
        const token = jwt.sign({ email, username }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        // Enviar el token como cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        // Verificar si el token existe
        if (!req.cookies.token) {
            res.status(400).json({ message: "No token found" });
            return;
        }

        // Limpiar la cookie del token
        res.clearCookie("token", {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
            //sameSite: 'strict',
        });

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error during logout" });
    }
}
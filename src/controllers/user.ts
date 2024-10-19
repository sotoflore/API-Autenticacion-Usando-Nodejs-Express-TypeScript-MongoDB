import { Request, Response } from "express";
import User from "../models/User.model";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { email, username } = req.body

    try {
        await User.findByIdAndUpdate(id, { email, username })
        res.status(200).json({ message: "User updated successfully" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}
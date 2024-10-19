import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({ message: "Unauthorized" })
        return 
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!)
        next()
    } catch (err: any) {
        res.status(401).json({ message: "Unauthorized" })
    }
}

export default isAuth
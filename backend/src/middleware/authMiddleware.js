import User from "../Models/User.js"
import jwt from 'jsonwebtoken'


export const proctedRoute = async (req, res, next) => {

    try {
        const usertoken = req.cookies?.jwt

        if (!usertoken) return res.status(401).json({ message: "Unauthorized - No token provided" })

        const decoded = jwt.verify(usertoken, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" })
        }

        const user = await User.findById(decoded.userId).select("-password")
        console.log(user)

        if (!user) return res.status(401).json({ message: "Unauthorized - User not found" })

        req.user = user

        next()
    } catch (error) {
        console.log("Error in procted routh middleware", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
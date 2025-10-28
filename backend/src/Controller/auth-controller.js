import User from "../Models/User.js"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    const { email, password, fullName } = req.body

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }

        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailCheck.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, please try with another email" })
        }

        const idx = Math.floor(Math.random() * 100) + 1 //generates number between 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar,
        })

        //  TODO: create user in stream as well

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevents XSS attacks
            sameSite: "strict", // prevents CSRF attack
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({ success: true, user: newUser })

    } catch (error) {

        console.log("Error in signup controller", error)
        res.status(500).json({message: "Internal Server Error"})

    }
}
export const logIn = async (req, res) => {
    res.send('login route')
}
export const logOut = (req, res) => {
    res.send('logout route')
}
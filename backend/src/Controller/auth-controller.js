import { upsertStreamUser } from "../lib/stream.js"
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

        //create user in stream as well
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || randomAvatar || ''
            })
            console.log("Stream account created for", newUser.fullName)
        } catch (error) {
            console.log('Error creating Stream account')
        }


        // create jwt token
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
        res.status(500).json({ message: "Internal Server Error" })

    }
}


export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ message: "Invalid Email or Password" })

        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid Email or Password" })


        // generate cookie
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevents XSS attacks
            sameSite: "strict", // prevents CSRF attack
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({ success: true, user })


    } catch (error) {
        console.log("Error in login controller", error)
        res.status(500).json({ message: "Internal Server Error" })

    }
}


export const logOut = (req, res) => {
    res.clearCookie('jwt')
    return res.status(200).json({ success: true, message: "Logout successful" })
}


export const onboard = async (req, res) => {

    try {
        const userId = req.user._id

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fiesds are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true
            },
            { new: true }
        )

        if (!updatedUser) return res.status(404).json({ message: "User not found" })


        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
        } catch (streamError) {
            console.log("Error updating Stream user during onboarding:", streamError.message);
        }

        res.status(200).json({ success: true, user: updatedUser })


    } catch (error) {
        console.error("Onboarding error:", error)
        req.status(500).json({ message: "Internal Server Error" })
    }

}
import express from 'express'
import { protectedRoute } from '../middleware/authMiddleware.js'
import { generateStreamToken } from '../lib/stream.js'

const router = express.Router()

router.get('/token', protectedRoute, async (req, res) => {
    try {
        const token = generateStreamToken(req.user.id)

        res.status(200).json({ token })

    } catch (error) {
        console.log("Error in chat controller:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export default router
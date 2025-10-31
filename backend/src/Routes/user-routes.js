import express from "express"
import { protectedRoute } from "../middleware/authMiddleware.js"
import { getMyFriends, getRecommendedUsers } from "../Controller/user-controller.js"

const router = express.Router()

// applies middleware to all routes
router.use(protectedRoute)

router.get('/', getRecommendedUsers)
router.get('/friends', getMyFriends)

export default router
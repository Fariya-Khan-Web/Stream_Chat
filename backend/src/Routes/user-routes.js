import express from "express"
import { protectedRoute } from "../middleware/authMiddleware.js"
import { acceptRequest, getMyFriends, getRecommendedUsers, sendFriendReq } from "../Controller/user-controller.js"

const router = express.Router()

// applies middleware to all routes
router.use(protectedRoute)

router.get('/', getRecommendedUsers)
router.get('/friends', getMyFriends)

router.post('/friendReq/:id', sendFriendReq)
router.post('/friendReq/:id/accept', acceptRequest)

export default router
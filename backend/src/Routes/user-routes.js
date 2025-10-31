import express from "express"
import { protectedRoute } from "../middleware/authMiddleware.js"
import { acceptRequest, getMyFriends, getRecommendedUsers, getRequest, getSentRequests, sendFriendReq } from "../Controller/user-controller.js"

const router = express.Router()

// applies middleware to all routes
router.use(protectedRoute)

router.get('/', getRecommendedUsers)
router.get('/friends', getMyFriends)

router.post('/friendReq/:id', sendFriendReq)
router.put('/friendReq/:id/accept', acceptRequest)

// notification
router.get('/friendReqs', getRequest)


router.get('/outgoingReqs', getSentRequests)

export default router
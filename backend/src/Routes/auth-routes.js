import express from 'express'
import { logIn, logOut, onboard, signUp } from '../Controller/auth-controller.js'
import { protectedRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/logout', logOut)

router.post('/onboarding', protectedRoute, onboard)

router.get('/me', protectedRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user })
})

export default router
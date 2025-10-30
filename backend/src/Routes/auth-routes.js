import express from 'express'
import { logIn, logOut, onboard, signUp } from '../Controller/auth-controller.js'
import { proctedRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/logout', logOut)

router.post('/onboarding', proctedRoute, onboard)

export default router
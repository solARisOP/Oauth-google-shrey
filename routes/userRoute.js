import express from 'express'
import { getUserData, googleOauthHandler } from '../controller/googleOauthHandler.js';
import authRoute from './authRoute.js'

const router = express.Router()

router.get('/auth/data', getUserData)
router.use('/auth', authRoute )
router.get('/sessions/oauth/google', googleOauthHandler)

export default router;
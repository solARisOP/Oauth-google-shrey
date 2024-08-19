import express from 'express'
import { getUserData, googleOauthHandler } from '../controller/googleOauthHandler.js';
import authRoute from './authRoute.js'

const router = express.Router()


router.use('/api/auth', authRoute )
router.get('/api/sessions/oauth/google', googleOauthHandler)
router.get('/api/auth/data', getUserData)



export default router;
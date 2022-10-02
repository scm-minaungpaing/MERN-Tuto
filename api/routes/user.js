import express from 'express'
import passport from 'passport'

import userController from '../controllers/user.js'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }),  userController.getUser)


export default router
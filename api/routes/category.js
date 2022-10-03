import express from 'express'
import passport from 'passport'

import categoryController from '../controllers/category.js'

const router = express.Router()

router.delete('/:id', passport.authenticate('jwt', { session: false }),  categoryController.destroy)

export default router
import express from 'express'
import passport from 'passport'

import transactionController from '../controllers/transaction.js'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), transactionController.index)
router.post('/', passport.authenticate('jwt', { session: false }), transactionController.store)
router.delete('/:id', passport.authenticate('jwt', { session: false }),  transactionController.destroy)
router.patch('/:id', passport.authenticate('jwt', { session: false }), transactionController.patch)

export default router
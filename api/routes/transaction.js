import express from 'express'
import passport from 'passport'

import transactionController from '../controllers/transaction.js'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), transactionController.index)
router.post('/', transactionController.store)
router.delete('/:id', transactionController.destroy)
router.patch('/:id', transactionController.patch)

export default router
import express from 'express'

import transactionController from '../controllers/transaction.js'

const router = express.Router()

router.get('/', transactionController.index)
router.post('/', transactionController.store)

export default router
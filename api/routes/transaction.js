import express from 'express'

import transactionController from '../controllers/transaction.js'

const router = express.Router()

router.get('/', transactionController.index)
router.post('/', transactionController.store)
router.delete('/:id', transactionController.destroy)

export default router
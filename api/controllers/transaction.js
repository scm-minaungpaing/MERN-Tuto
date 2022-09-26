import Transaction from "../models/transaction.js"


const index = async (req, res) => {
    const transaction = await Transaction.find().sort({ createdAt: -1})
    res.json({data: transaction})
}

const store = async (req, res) => {
    const {amount, description, date} = (req.body)
    const transaction = new Transaction({
        amount,
        description,
        date
    })
    await transaction.save()
    res.status(200).json({ message: 'Success!'})
}

export default {
    store,
    index,
}
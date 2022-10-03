import Transaction from "../models/transaction.js"


const index = async (req, res) => {
    const transaction = await Transaction.find({user_id: req.user._id}).sort({ createdAt: -1})
    res.json({data: transaction})
}

const store = async (req, res) => {
    console.log(req.body)
    const {amount, description, date} = (req.body)
    const transaction = new Transaction({
        amount,
        description,
        user_id: req.user._id,
        category_id: req.body.category_id,
        date
    })
    await transaction.save()
    res.status(200).json({ message: 'Success!'})
}

const destroy = async (req, res) => {
    await Transaction.findOneAndDelete({_id: req.params.id})
    res.status(200).json({ message: 'Ok'})
}

const patch = async (req, res) => {
    await Transaction.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    res.status(200).json({ message: "Ok"})
}

export default {
    store,
    index,
    destroy,
    patch,
}
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: Number,
    description: String,
    user_id: mongoose.Types.ObjectId,
    date: { type: Date, default: new Date() },
}, { timestamps: true})

const transaction = mongoose.model('Transaction', transactionSchema)
export default transaction
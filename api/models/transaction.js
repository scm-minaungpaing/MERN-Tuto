import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: Number,
    description: String,
    date: { type: Date, default: new Date() },
}, { timestamps: true})

const transaction = mongoose.model('Transaction', transactionSchema)
export default transaction
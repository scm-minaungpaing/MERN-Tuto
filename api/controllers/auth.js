import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const categories = [
    { label: "Travel", icon: "user"},
    { label: "Shopping", icon: "user"},
    { label: "Investment", icon: "user"},
    { label: "Bills", icon: "user"},
]

const register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    if (!(email && firstName && lastName && password)) {
        res.status(401).json({ message: "Need to fill all"})
        return
    }

    const isExistUser = await User.findOne({ email })
    if (isExistUser) {
        res.status(406).json({ message: "User was already exits."})
        return
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashPassword = await bcrypt.hashSync( password, salt);

    const user = await User({ email, password: hashPassword, firstName, lastName, categories})
    await user.save()
    
    res.status(200).json({ message: 'Success!'})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!(email && password)) {
        res.status(401).json({ message: "Need to fill all"})
        return
    }

    const user = await User.findOne({ email })
    if (!user) {
        res.status(401).json({ message: "Your email or password is incorrect!"})
        return
    }

    const matched = await bcrypt.compare(password, user.password)

    if (!matched) {
        res.status(401).json({ message: "Your email or password is incorrect!"})
        return
    }

    const payload = {
        email,
        _id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ message: "Logged in successfully!", token, user})
}

export default {
    register,
    login
}
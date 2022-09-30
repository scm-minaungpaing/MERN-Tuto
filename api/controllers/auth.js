import User from "../models/user.js";
import bcrypt from 'bcrypt'

const register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const isExistUser = await User.findOne({ email })
    if (isExistUser) {
        res.status(406).json({ message: "User was already exits."})
        return
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashPassword = await bcrypt.hashSync( password, salt);

    const user = await User({ email, password: hashPassword, firstName, lastName})
    await user.save()
    
    res.status(200).json({ message: 'Success!'})
}

export default {
    register,
}
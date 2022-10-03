import User from "../models/user.js"

const destroy = async (req, res) => {
    const categories = req.user.categories
    const newCategoies = categories.filter( category => category._id != req.params.id)

    const user = await User.updateOne(
        {_id: req.user.id},
        {$set: { categories: newCategoies}}
    )
    res.status(200).json({ user })
}

export default {
    destroy
}

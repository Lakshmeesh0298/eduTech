const { JWT_COOKIE_EXPIRE } = require("../config");
const UserModel = require("../Model/UserModel");
const UserSchema = require('../Model/UserModel')
const errorResponse = require("../utils/errorResponse");
const skillarySchema = require("../Model/skillarySchema");
const { default: mongoose } = require("mongoose");

exports.profileController = async (req, res, next) => {
    try {
        console.log(req.user)
        let { profile_picture } = req.body;
        let { id } = req.user
        console.log(id)
        let profile = await UserSchema.updateOne({ _id: id }, { profile_picture: profile_picture })
        res.send(profile)

    } catch (error) {
        console.log(error);
        next(new errorResponse("profile not updated", 500))
    }
}

exports.getuserController = async (req, res) => {
    const user = await UserModel.find({})
    res.status(200).json(user)
}

exports.addtocartController = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body
    try {
        const user = await UserModel.findById(userId)
        const course = await skillarySchema.findById(id)
        if (user.id === userId) {
            if (!user.cart.includes(course.id)) {
                await user.updateOne({ $push: { cart: id } })
                const updatedUser = await UserModel.findById(userId)
                res.status(200).json({ message: 'course added', user:updatedUser, cart:course})
            } else {
                await user.updateOne({ $pull: { cart: id } })
                const updatedUser = await UserModel.findById(userId)
                res.status(200).json({ message: 'course deleted', user:updatedUser })
            }
        } else {
            res.status(403).json({ message: 'Unauthorized User' })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
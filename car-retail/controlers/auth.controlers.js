import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from "../utils/utils.js"

export const signUp = expressAsyncHandler(async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
        mobile: req.body.mobile,
        address: req.body.address
    })

    const user = await newUser.save();
    if (user) {
        res.status(200).send({ message: "user registered successfully" })
    }
})

export const signIn = expressAsyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (user) {

        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user)
            })
        }
    }

})
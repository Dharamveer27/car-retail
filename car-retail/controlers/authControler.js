import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from "../utils/utils.js"




export const login = expressAsyncHandler(async (req, res) => {


    const user = await User.findOne({ email: req.body.email })
    if (user) {


        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user)
        })

    }

})
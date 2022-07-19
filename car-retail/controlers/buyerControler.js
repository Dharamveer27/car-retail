import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import { ContextBuilder } from "express-validator/src/context-builder.js";

export const changePassword = expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.user.email })

    const isEqual = bcrypt.compareSync(req.body.oldPassword, user.password)
    console.log(isEqual);

    if (isEqual) {
        user.password = bcrypt.hashSync(req.body.newPassword, 10)
        user.save().then((savedUser) => { res.send({ message: "password changed" }) }, (err) => { res.send({ message: err.message }) });
    }

})
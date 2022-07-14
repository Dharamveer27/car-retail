import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const addUser = expressAsyncHandler(async (req, res) => {
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
        res.status(200).send({ message: "user added successfully" })
    }
})
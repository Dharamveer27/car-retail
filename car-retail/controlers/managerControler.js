import User from "../models/userModel.js"


//get users
export const getBuyers = (req, res, next) => {
    User.find({ role: 'buyer', isDeleted: false }, function (data, error) {
        if (data) {
            res.status(200).send({ data: data ,message:"Buyers List"})
        }
        else {
            res.status(401).send({ message: error })
        }
    })
}
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Retail from "../models/retailModel.js";
import bcrypt from "bcrypt";
import Car from "../models/carModel.js";


import { ContextBuilder } from "express-validator/src/context-builder.js";
import mongoose from "mongoose";

//reset password
export const changePassword = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  const isEqual = bcrypt.compareSync(req.body.oldPassword, user.password);
  console.log(isEqual);

  if (isEqual) {
    user.password = bcrypt.hashSync(req.body.newPassword, 10);
    user.save().then(
      (savedUser) => {
        res.send({ message: "password changed" });
      },
      (err) => {
        res.send({ message: err.message });
      }
    );
  }
});

// buy request
export const buyRequest = expressAsyncHandler(async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user._id);
  const carId = mongoose.Types.ObjectId(req.params.id)
  Car.findById(carId, (err, data) => {
    if (data == null) {
      res
        .status(404)
        .json({ message: "Car Not Found" });
    }
    else {
      const retail = new Retail({
        userId: userId,
        carId: carId,
      });


      retail.save().then(
        (data) => {
          if (data) {
            res
              .status(200)
              .json({ message: "Buy Request Successfyully Submitted" });
          }
        },
        (error) => {
          if (error.code == 11000) {
            res.status(400).json({ message: "Car Not Available " });
          }
        }
      );
    }
  })

});

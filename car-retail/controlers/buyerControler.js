import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Retail from "../models/retailModel.js";
import bcrypt from "bcrypt";

import { ContextBuilder } from "express-validator/src/context-builder.js";

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
  const userId = req.user._id;
  const carId = req.params.id;
  console.log(carId);
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
        res.status(400).json({ message: "Already Requested by another user" });
      }
    }
  );
});

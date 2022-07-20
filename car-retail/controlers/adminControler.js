import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { createPassword, sendmail } from "../utils/utils.js";
import formidable from "formidable";
import csv from "csvtojson";
import fs from "fs";

//get users
export const getBuyersAndManagers = (req, res, next) => {
  User.find(
    {
      role: ["buyer", "manager"],
      isDeleted: false,
    },
    function (data, error) {
      if (data) {
        res.status(200).send({ data: data, message: "Users List" });
      } else {
        res.status(401).send({ message: error });
      }
    }
  );
};

//adding a single user
export const addUser = expressAsyncHandler(async (req, res) => {
  const newPassword = createPassword(8, 5, 5);
  const existingUser = await User.findOne({
    email: req.body.email,
    isDeleted: true,
  });
  console.log(existingUser);
  if (existingUser) {
    existingUser.isDeleted = false;
    const user = await existingUser.save();
    if (user) {
      sendmail(newPassword, req.body.email);
      res.status(200).send({ user: user, message: "user added successfully" });
    }
  } else {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(newPassword, 10),
      role: req.body.role,
      mobile: req.body.mobile,
      address: req.body.address,
    });

    const user = await newUser.save();
    if (user) {
      sendmail(newPassword, req.body.email);
      res.status(200).send({ user: user, message: "user added successfully" });
    }
  }
});
//bulk user add
export const addUserinBulk = expressAsyncHandler(async (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log("error in parsing file");
    }
    fs.readFile(files.files.filepath, function () {
      csv()
        .fromFile(files.files.filepath)
        .then((response) => {
          for (let x = 0; x < response.length; x++) {
            const newPassword = createPassword(8, 5, 5);
            response[x].password = bcrypt.hashSync(newPassword, 10);
            const newUser = new User(response[x]);
            newUser
              .save()
              .then((data) => {
                if (data) {
                  sendmail(newPassword, data.email);
                }
              })
              .catch(entryChecker);
          }
          res.json({ message: "File Data Successfully added" });
        });
    });
  });
});
//udating a user
export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.mobile = req.body.mobile || user.mobile;
    user.address = req.body.address || user.address;
    user.password = bcrypt.hashSync(req.body.password, 10) || user.password;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});
//delete user
export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === "admin") {
      res
        .status(400)
        .send({ user: data, message: "Can Not Delete Admin User" });
      return;
    }
    user.isDeleted = true;
    user.save();
    res.send({ user: user, message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const entryChecker = (data) => {
  if (data.code == 11000 && data.keyValue.email) {
    User.findOne({ email: response[x].email, isDeleted: true }).then((data) => {
      if (data) {
        const newPassword = createPassword(8, 5, 5);
        data.password = bcrypt.hashSync(newPassword, 10);
        data.isDeleted = false;
        data.save().then((result, err) => {
          if (data) {
            sendmail(newPassword, result.email);
          }
        });
      }
    });
  }
};

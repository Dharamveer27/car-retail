import { body } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer"
import { config } from 'dotenv';


import jwt from 'jsonwebtoken'
export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
};

export const loginValidation = [
    body('email').isEmail().withMessage("Please enter valid Email").custom(value => {
        return User.findOne({ email: value }).then(foundUser => {
            if (!foundUser) {
                return Promise.reject('user not found')
            }
        })
    }),
    body('password').not().isEmpty().withMessage("password field cannot be empty").custom(async (value, { req }) => {
        const user = await User.findOne({ email: req.body.email })

        const isEqual = bcrypt.compareSync(value, user.password)
        if (!isEqual) {
            return Promise.reject('Incorrect Password')
        }
    })
]


const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const integers = "0123456789";
const exCharacters = "!@#$%^&*_-=+";
export const createPassword = (length, hasNumbers, hasSymbols) => {
    let chars = alpha;
    if (hasNumbers) {
        chars += integers;
    }
    if (hasSymbols) {
        chars += exCharacters;
    }
    return generatePassword(length, chars);
};
const generatePassword = (length, chars) => {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};


export const sendmail = (password, email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_EMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: email,
        subject: 'New Registration',
        text: `Hello user welcome to Car Retail,
        You are registered sucessfully with Car Rental.
        Your auto-generated password is `+ password
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
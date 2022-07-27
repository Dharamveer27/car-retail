import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: "String", required: [true, "first name not provided"] },
        lastName: { type: "String", required: [true, "last name not provided"] },
        email: {
            type: String,
            unique: [true, "email already exists in database!"],
            lowercase: true,
            trim: true,
            required: [true, "email not provided"],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!'
            }

        },
        mobile: { type: "String", required: true },
        address: { type: "String", required: true },
        password: { type: "String", required: true },
        role: {
            type: String,
            enum: ["buyer", "manager", "admin"],
            required: [true, "Please specify user role"]
        },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
);


const User = new mongoose.model("User", userSchema);
export default User;
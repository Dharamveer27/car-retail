import mongoose from 'mongoose';


const CarSchema = new mongoose.Schema({

    carId: {
        type: Number,
        required: true,
        unique: true

    },

    carMaker: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
        required: true,

    },
    carVariant: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    rto: {
        type: String,
        required: true,
    },
    registrationState: {
        type: String,
        required: true,
    },
    registrationYear: {
        type: Number,
        required: true,
    },
    carMileage: {
        type: Number,
        required: true,
    },
    carBodyType: {
        type: String,
        required: true,
    },
    carScore: {
        type: Number,
        required: true,
        min: [4, "score can't be less than 4"],
        max: [10, "score can't be greater than 10"],

    },
    isDeleted: { type: Boolean, default: false }

})

const Car = new mongoose.model('car', CarSchema);

export default Car;
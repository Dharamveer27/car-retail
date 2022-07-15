import mongoose from 'mongoose';


const CarSchema = new mongoose.Schema({
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
      rto: {
        type: String,
        required: true,
      },
      carState: {
        type: String,
        required: true,
      },
      carYear: {
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
      },

    })

    const Cars = new mongoose.model('cars',CarSchema);
    
    export default Cars;
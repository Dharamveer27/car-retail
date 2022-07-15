import express from 'express'
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Cars from '../models/carModel.js';
const carsRouter = Router();
import CarSchema from '../models/carModel.js'

/* GET users listing. */
carsRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// GET all cars
carsRouter.get('/allcars', function (req, res, next) {
  Cars.find({}, function (err, cars) {
    res.send(cars)
  });
});

// GET individual cars
carsRouter.get('/:id',expressAsyncHandler( async(req, res) => {
  const car= Cars.findById(req.params.id)
  if(car){
    await Cars.findOne()
    res.send({message:'maa ki'})
  }
  else {
    res.status(404).send({ message: 'Car Not Found' });
}


  }));


carsRouter.post('/addsinglecar', expressAsyncHandler(async (req, res) => {

  const newCar = new Cars({
    carMaker: req.body.carMaker,
    carModel: req.body.carModel,
    carVariant: req.body.carVariant,
    city: req.body.city,
    rto: req.body.rto,
    carState: req.body.carState,
    carYear: req.body.carYear,
    carMileage: req.body.carMileage,
    carBodyType: req.body.carBodyType,
    carScore: req.body.carScore
  })

  const car = await newCar.save();

  if (car) {
    res.status(201).send({ message: "car add successfully" })
  }


}))

carsRouter.delete('/:id',expressAsyncHandler( async(req, res) => {
  const car = Cars.findById(req.params.id)
  if (car) {
    await car.remove();
    res.send({ message: "Car deleted" })
  }else {
    res.status(404).send({ message: 'Car Not Found' });
  }
}))



export default carsRouter;

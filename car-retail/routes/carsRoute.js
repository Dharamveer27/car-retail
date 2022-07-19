import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { addCar, bulkCarUpload, deleteCar, getAllCars, getCarbyId, getCSV, updateCar } from '../controlers/carControler.js';
import { isManager, verifyToken } from '../middleware/authJWT.js';
import Cars from '../models/carModel.js';
const carsRouter = Router();


// GET all cars
carsRouter.get('/', verifyToken, getAllCars)

//get all cars in csv
carsRouter.get('/csv', verifyToken, getCSV);

// GET individual cars
carsRouter.get('/:id', verifyToken, getCarbyId);

//add a car 
carsRouter.post('/', verifyToken, isManager, addCar)
//add cars using csv upload
carsRouter.post('/cars', verifyToken, isManager, bulkCarUpload)
//update a car
carsRouter.put('/', verifyToken, isManager, updateCar)
//delete a car
carsRouter.delete('/:id', verifyToken, isManager, deleteCar)




export default carsRouter;
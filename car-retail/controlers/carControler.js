import expressAsyncHandler from "express-async-handler";
import formidable from "formidable";
import csv from "csvtojson";
import Car from "../models/carModel.js";
import converter from "json-2-csv";

//get all cars
export const getAllCars = expressAsyncHandler(async (req, res) => {
  const cars = await Car.find({ isDeleted: false });
  res.send({ cars: cars, message: "List of cars" });
});

//get car by id
export const getCarbyId = expressAsyncHandler(async (req, res) => {
  const car = Car.findById(req.params.id);
  if (car && !car.isDeleted) {
    res.send({ car: car, message: "Car Details" });
  } else {
    res.status(404).send({ message: "Car Not Found" });
  }
});

//add new car
export const addCar = expressAsyncHandler(async (req, res) => {
  const newCar = new Car({
    carId: req.body.carId,
    carMaker: req.body.carMaker,
    carModel: req.body.carModel,
    carVariant: req.body.carVariant,
    city: req.body.city,
    registrationNumber: req.body.registrationNumber,
    rto: req.body.rto,
    registrationState: req.body.registrationState,
    registrationYear: req.body.registrationYear,
    carMileage: req.body.carMileage,
    carBodyType: req.body.carBodyType,
    carScore: req.body.carScore,
  });

  newCar
    .save()
    .then((car) => {
      res.status(201).send({ car: car, message: "car add successfully" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        Car.findOne({ carId: req.body.carId, isDeleted: true })
          .then((car) => {
            if (car) {
              car.isDeleted = false;
              car
                .save()
                .then((result) => {
                  res
                    .status(201)
                    .send({ car: result, message: "car add successfully" });
                })
                .catch((err) => {
                  res.status(500).send({ message: err.message });
                });
            } else {
              res.send({ message: "car already exist" });
            }
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      }
    });
});


//update car
export const updateCar = expressAsyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car && !car.isDeleted) {
    car.carMaker = req.body.carMaker || car.carMaker;
    car.carModel = req.body.carModel || car.carModel;
    car.carVariant = req.body.carVariant || car.carVariant;
    car.city = req.body.city || car.city;
    car.rto = req.body.rto || car.rto;
    car.registrationState = req.body.registrationState || car.registrationState;
    car.registrationYear = req.body.registrationYear || car.registrationYear;
    car.carMileage = req.body.carMileage || car.carMileage;
    car.carBodyType = req.body.carBodyType || car.carBodyType;
    car.carScore = req.body.carScore || car.carScore;

    const updatedCar = await car.save();
    res.send({ message: "Car Updated successfully", car: updatedCar });
  } else {
    res.status(404).send({ message: "Car Not Found" });
  }
});

//delete a car
export const deleteCar = expressAsyncHandler(async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, { isDeleted: true })
res.send({ message: "Car deleted" });
});


// uplode cars using csv
export const bulkCarUpload = expressAsyncHandler(async (req, res) => {
  const form = formidable({});
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("error in parsing file");
    }
    csv()
      .fromFile(files.file.filepath)
      .then(
        (cars) => {
          for (let i = 0; i < cars.length; i++) {
            const newCar = new Car(cars[i]);
            newCar.save().catch((err) => {
              if (err.code === 11000) {
                Car.findOne({ carId: cars[i].carId, isDeleted: true }).then(
                  (car) => {
                    if (car) {
                      car.isDeleted = false;
                      car.save().then((result) => {});
                    }
                  }
                );
              }
            });
          }
          res.send({ message: "Cars added successfully" });
        },
        (err) => {
          console.log(err.message);
        }
      );
  });
});

//csv of car data
export const getCSV = expressAsyncHandler(async (req, res) => {
  const cars = await Car.aggregate([
    {
      $project: {
        Inventory_Id: "$carId",
        Registreation_Number: "$registrationNumber",
        Make: "$carMaker",
        Model: "$carModel",
        Variant: "$carVariant",
        City: "$city",
        _id: 0,
      },
    },
  ]);
  console.log(cars);
  converter.json2csv(cars, (err, csv) => {
    res.attachment("file.csv").send(csv);
  });
});

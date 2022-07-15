import express, { json, urlencoded} from 'express';
import path, { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { config } from 'dotenv';


import { default as mongoose } from 'mongoose';
import carsRouter from './routes/cars.js';
import indexRouter from './routes/index.js';

var app = express();
config();
//connection to db

mongoose.connect(process.env.CONNECTION_URL , {
    useNewUrlParser: true
  }).then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err.message));


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cars', carsRouter);
app.use('/allcars',carsRouter);
app.use('/deletecar',carsRouter);

app.use((err,req,res,next)=>{
  res.status(500).send({ message: err.message });

})
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

export default app;
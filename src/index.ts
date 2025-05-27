import express from 'express';
import helloRouter from './routes/hello';
import userRouter from './routes/users';
import vendorRouter from './routes/vendor';
import floorRouter from './routes/floor';
import siteRouter from './routes/site';
import departmentRouter from './routes/department';
import beaconRouter from './routes/beacon';
import gatewayRouter from './routes/gateway';
import routeRouter from './routes/route';
import scheduleRouter from './routes/schedule';
import employeeRouter from './routes/employee';
import teamRouter from './routes/team';
import alertRouter from './routes/alert';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://tracking.pakuwon.local'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());
app.use('/hello', helloRouter);
app.use('/users',userRouter);
app.use('/vendor',vendorRouter);
app.use('/floor',floorRouter);
app.use('/beacon',beaconRouter);
app.use('/site',siteRouter);
app.use('/department',departmentRouter);
app.use('/gateway',gatewayRouter);
app.use('/route',routeRouter);
app.use('/schedule',scheduleRouter);
app.use('/employee',employeeRouter);
app.use('/team',teamRouter);
app.use('/alert',alertRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

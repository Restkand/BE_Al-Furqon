import express from 'express';
import helloRouter from './routes/hello';
import userRouter from './routes/users';
import vendorRouter from './routes/vendor';
import floorRouter from './routes/floor';
import siteRouter from './routes/site';
import departmentRouter from './routes/department';
import beaconRouter from './routes/beacon';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use('/hello', helloRouter);
app.use('/users',userRouter);
app.use('/vendor',vendorRouter);
app.use('/floor',floorRouter);
app.use('/beacon',beaconRouter);
app.use('/site',siteRouter);
app.use('/department',departmentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

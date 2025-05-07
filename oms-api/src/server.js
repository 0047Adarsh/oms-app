import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import orderRoutes from './routes/orderRoutes.js';
import complaintRoutes from './routes/complaintsRoutes.js'


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Order Management API' });
});

app.use('/api/orders', orderRoutes);

app.use('/api/complaints', complaintRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
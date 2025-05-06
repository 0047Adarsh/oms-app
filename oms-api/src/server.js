import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import orderRoutes from './routes/orderRoutes.js';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Order Management API' });
});

// Routes
app.use('/api/orders', orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
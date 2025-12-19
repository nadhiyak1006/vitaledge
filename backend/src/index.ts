import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import profileRoutes from './routes/profile';
import healthRoutes from './routes/health';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/profile', profileRoutes);
app.use('/api/health-records', healthRoutes);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

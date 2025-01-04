import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes.js';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Server is running");
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
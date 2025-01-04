import express from 'express';
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});

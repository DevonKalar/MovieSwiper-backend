import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(cors({ origin: config.corsOrigins }));
app.use(routes);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

app.get('/', (req, res) => {
    res.json({ message: 'I am ready' });
});
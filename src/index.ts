import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: config.corsOrigins
}));

app.use(routes);


app.get('/', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
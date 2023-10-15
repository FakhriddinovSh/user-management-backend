import express from 'express';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json());

import postgres from './middlewares/postgres.js';
app.use(postgres);

import UserModule from './routes/users.js';
app.use(UserModule);

app.listen(PORT, () =>
	console.log(`Server running on port: http://localhost:${PORT}`),
);

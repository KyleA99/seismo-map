import express from 'express';
import dotenv from 'dotenv';
import earthquakeRoutes from './routes/earthquakeRoutes.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Parses our openapi.json file to generate swagger documentation.
const swaggerDocument = JSON.parse(fs.readFileSync('./docs/openapi.json', 'utf8'));

// Sets our routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/earthquakes', earthquakeRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

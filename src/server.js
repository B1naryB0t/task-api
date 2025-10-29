import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './routes/taskRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Load OpenAPI spec
const swaggerDocument = YAML.load(join(__dirname, '../public/bundled.yaml'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
	res.json({
		message: 'Task API is running',
		documentation: '/api-docs',
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: 'Something went wrong!',
		message: err.message,
	});
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		error: 'Route not found',
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;

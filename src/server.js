import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
	res.json({
		message: 'Task API is running',
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
});

export default app;

import { param } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

export const validateTaskId = [
	param('id')
		.isInt({ min: 1 })
		.withMessage('ID must be a number'),

	checkValidationResults,
];

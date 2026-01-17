import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { JwtAuthAdapter } from '../adapters/JwtAuthAdapter';
import jwt from 'jsonwebtoken';

// Example secret, replace with process.env.JWT_SECRET in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Instantiate AuthService with JwtAuthAdapter
const authService = new AuthService(new JwtAuthAdapter(jwt, JWT_SECRET));

export async function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	const user = await authService.authenticate(token);
	if (!user) {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}

	// Attach user info to request for downstream handlers
	(req as any).user = user;
	next();
}
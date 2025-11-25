import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log("Token found:", token.substring(0, 20) + "...");

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ADRSB#@G');
            console.log("Decoded token:", decoded);

            // Get user from token - FIXED: Use decoded.Id instead of decoded.id
            req.user = await User.findById(decoded.Id).select('-password');
            console.log("User found:", req.user);

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next();
        } else {
            console.log("No token provided");
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Not authorized' });
    }
};
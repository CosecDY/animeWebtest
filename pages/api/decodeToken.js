import User from "@/models/User";
import { mongooseConnect } from '@/lib/mongoose';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { method, headers } = req;

    if (method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    try {
        await mongooseConnect(); // Ensure MongoDB connection is established

        const token = headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authorization token not found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode JWT token
        const user = await User.findById(decoded.userId); // Find user by userId from decoded token

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is found, return user information
        res.status(200).json({ user: { username: user.username, email: user.email } });

    } catch (error) {
        console.error('Decode Token Error:', error);

        // Handle different types of errors that may occur during decoding or database operations
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Handle MongoDB errors or other unexpected errors
        res.status(500).json({ message: 'Failed to decode token' });
    }
}

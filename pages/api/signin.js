import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mongooseConnect } from "@/lib/mongoose";
import User from '../../models/User';

export default async function handler(req, res) {
    const { method, body } = req;

    await mongooseConnect();

    switch (method) {
        case 'POST':
            try {
                const { username, password } = body;
                const user = await User.findOne({ username });

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.json({ token });
            } catch (error) {
                console.error('Signin Error:', error);
                res.status(500).json({ message: 'Signin failed' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

import bcrypt from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req, res) {
    const { method, body } = req;

    await mongooseConnect(); 

    switch (method) {
        case 'POST':
            try {
                const { username, email, password } = body;
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ username, email, password: hashedPassword });
                await newUser.save();
                res.status(201).json({ message: 'User created successfully' });
            } catch (error) {
                console.error('Signup Error:', error);
                res.status(500).json({ message: 'Signup failed' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

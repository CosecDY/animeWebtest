import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex'); 
};
const SECRET_KEY = generateSecretKey();

export default async function handle(req, res) {
    await mongooseConnect();
    
    const { method } = req;

    try {
        switch (method) {
            case 'POST': {
                const newUser = new User(req.body);
                const savedUser = await newUser.save();

                // Create JWT token
                const token = jwt.sign({ userId: savedUser._id, username: savedUser.username, email: savedUser.email }, SECRET_KEY, { expiresIn: '1h' });

                res.status(201).json({ user: savedUser, token });
                break;
            }
            case 'GET': {
                const { username, password } = req.query;
                if (!username || !password) {
                    res.status(400).json({ error: 'Missing username or password parameter' });
                } else {
                    const signIn = await User.findOne({ username });
                    if (signIn && signIn.password === password) {
                        // Create JWT token
                        console.log(username);
                        const token = jwt.sign({ userId: signIn._id, username: signIn.username, email: signIn.email }, SECRET_KEY, { expiresIn: '1h' });

                        res.status(200).json({ message: 'Login successful', token });
                    } else {
                        res.status(401).json({ error: 'Invalid credentials' });
                    }
                }
                break;
            }
            case 'PUT': {
                const { id, ...userData } = req.body;
                const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
                if (!updatedUser) {
                    res.status(404).json({ error: 'User not found' });
                } else {
                    res.status(200).json(updatedUser);
                }
                break;
            }
            case 'DELETE': {
                const { id } = req.query;
                if (!id) {
                    res.status(400).json({ error: 'Missing id parameter' });
                    return;
                }
                const deletedUser = await User.findByIdAndDelete(id);
                if (!deletedUser) {
                    res.status(404).json({ error: 'User not found' });
                } else {
                    res.status(200).json({ success: true });
                }
                break;
            }
            default: {
                res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
                res.status(405).json({ error: `Method ${method} not allowed` });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

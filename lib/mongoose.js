import mongoose from "mongoose";

export async function mongooseConnect() {
    if (mongoose.connection.readyState === 1) {
        // If connection is already established, return the existing connection
        return mongoose.connection;
    } else {
        // Check if MONGODB_URI environment variable is set
        if (!process.env.MONGODB_URI) {
            throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
        }

        const uri = process.env.MONGODB_URI;

        try {
            // Connect to MongoDB using Mongoose
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            console.log('MongoDB connected successfully.');
            return mongoose.connection;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error; 
        }
    }
}
import mongoose from 'mongoose';

export async function connect() {
    try {
        if (mongoose.connection.readyState >= 1) {
      console.log("✅ MongoDB already connected");
      return;
        }

        console.log("I am here....n");
        
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('Missing MONGO_URI environment variable');
        }

        // If already connected, return early
        if (mongoose.connections[0].readyState) {
            return;
        }

        // Connect with minimal options - the driver handles the rest
        await mongoose.connect(uri,{
         bufferCommands: false,
        });
        
        console.log('✓ MongoDB connected successfully');
        
        // Handle connection events
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        return mongoose.connection;
    } catch (error: any) {
        console.error('Failed to connect to MongoDB:', {
            error: error.message,
            code: error.code,
            name: error.name
        });
        throw error;
    }
}
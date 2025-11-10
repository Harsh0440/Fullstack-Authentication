const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');
        console.log('Using URI:', process.env.MONGO_URI?.replace(/:[^:@]+@/, ':****@'));
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Successfully connected to MongoDB!');
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        process.exit(0);
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1);
    }
}

testConnection();
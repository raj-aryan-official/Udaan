const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    const dbURI = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/udaan_db';
    const conn = await mongoose.connect(dbURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;

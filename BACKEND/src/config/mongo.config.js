import mongoose from 'mongoose';

// console.log(process.env.MONGO_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}/url-shortener`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

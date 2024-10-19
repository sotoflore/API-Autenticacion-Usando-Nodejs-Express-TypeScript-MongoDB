import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL_DATABASE= process.env.MONGO_URL_DATABASE

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL_DATABASE!);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
        process.exit(1); // Cierra la aplicación si hay un error de conexión
    }
};

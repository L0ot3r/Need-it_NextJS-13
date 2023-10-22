import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URI) return console.log(`MONGODB_URI n'existe pas`);

	if (isConnected) return console.log('Vous êtes déjà connecté à MongoDB');

	try {
		await mongoose.connect(process.env.MONGODB_URI);

		isConnected = true;
		console.log('Vous êtes connecté à MongoDB');
	} catch (error: any) {
		console.log(`Èchec de la connxion à Mongo_DB: ${error.message}`);
	}
};

import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$app/env/private';

const client = new MongoClient(MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}

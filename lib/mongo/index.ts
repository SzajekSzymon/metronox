import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export { connectToDatabase, client };
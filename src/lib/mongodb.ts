// MongoDB Atlas Connection Setup for Backend Server (server.ts)
// Main Primary Database for Products, User Profiles, Mandi Bhav rates & Analytics

import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.MONGODB_DB_NAME || 'triveni_plus_db';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToMongoDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI is not defined in environment variables. Operating in in-memory mode.');
    return { client: null, db: null };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;
    console.log('✅ Connected successfully to MongoDB Atlas database:', DB_NAME);

    return { client, db };
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error);
    return { client: null, db: null };
  }
}

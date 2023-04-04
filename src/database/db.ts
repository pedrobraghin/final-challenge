import mongoose from 'mongoose';

export async function connect() {
  let DB_URL = process.env.DB_URL as string;
  const DB_PASS = process.env.DB_PASS as string;
  const DB_USER = process.env.DB_USER as string;

  DB_URL = DB_URL.replace('<USER>', DB_USER);
  DB_URL = DB_URL.replace('<PASS>', DB_PASS);

  mongoose.set('strictQuery', true);

  await mongoose.connect(DB_URL);
}

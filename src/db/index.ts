import { neon } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let database: NeonHttpDatabase<typeof schema> | undefined;

export function getDb() {
  if (database) return database;
  const url = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL_POOLED or DATABASE_URL is not configured.');
  database = drizzle(neon(url), { schema });
  return database;
}

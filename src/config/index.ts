import "dotenv/config";

export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_MAX_AGE = 7 * 24 * 60 * 60;
export const DB_FILE = process.env.DB_FILE_NAME;

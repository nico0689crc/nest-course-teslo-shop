import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export async function hash(rawData: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawData, salt);
}

export async function compareHash(rawData: string, hashedData: string) {
  return bcrypt.compare(rawData, hashedData);
}

export const generateUUID = () => faker.string.uuid();

export const generateToken = () => crypto.randomBytes(32).toString('hex');

export const generateStringNumeric = (length: number) =>
  faker.string.numeric(length);

export const generateAccessToken = <T>(payload: Partial<T>) =>
  jwt.sign(payload, process.env.COOKIE_SECRET, { expiresIn: 86400000 });
export const verifyAccessToken = (accessToken: string) =>
  jwt.verify(accessToken, process.env.COOKIE_SECRET, (error, decoded) =>
    error ? false : decoded,
  ) as any;

export function getRandomCoverImageUrl() {
  const number = Math.floor(Math.random() * 20) + 1;
  return `https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_${number}.jpg`;
}

import * as dotenv from 'dotenv';
dotenv.config();

export const configuration = {
  dialect: 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  port: Number(process.env['DB_PORT']) || 5432,
  username: process.env['DB_USERNAME'] || 'iweb',
  password: process.env['DB_PASSWORD'] || 'password',
  database: process.env['DB_NAME'] || 'goldbazar',
  autoLoadModels: true,
  synchronize: true,
  jwtPrivateKey: process.env['JWT_PRIVATE_KEY'],
  jwtPublicKey: process.env['JWT_PUBLIC_KEY'],
  jwtExpiry: process.env['JWT_EXPIRY'],
  jwtRefreshExpiry: process.env['JWT_REFRESH_EXPIRY'],
  jwtIssuer: process.env['JWT_ISSUER'] || 'ImpulsiveWeb',
  jwtAlgorithm: process.env['JWT_ALGORITHM'] || 'RS256'
};

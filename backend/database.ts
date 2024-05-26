import { Sequelize, Dialect } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
  }
);

export default sequelize;

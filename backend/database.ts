import { Sequelize, Dialect } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  "aec-address-manager",
   "postgres",
   "postgres",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

export default sequelize;

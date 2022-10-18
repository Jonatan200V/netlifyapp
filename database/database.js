// const Sequelize = require("sequelize");
// const pg = require("pg");

// require("dotenv").config();
import pg from "pg";
import { Sequelize } from "sequelize";
// const { DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
console.log("HOLA MUNDO");
const sequelize = new Sequelize(
  `postgresql://postgres:5hV97Ke02ZasxBuBZY3M@containers-us-west-108.railway.app:7425/railway`,
  {
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export default sequelize;

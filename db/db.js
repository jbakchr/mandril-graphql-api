const { Sequelize } = require("sequelize");

// Get DB password and host from .env
const { DB_PASSWORD, DB_HOST } = process.env;

// Determine if code is running locally or in Docker
const DB_PASS = DB_PASSWORD ? DB_PASSWORD : "Esmun";
const HOST = DB_HOST ? "localhost" : "db";

const db = new Sequelize("mandrilapi", "root", DB_PASS, {
  host: HOST,
  dialect: "mysql",
});

module.exports = db;

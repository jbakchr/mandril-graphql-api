const { Sequelize } = require("sequelize");

console.log("In db");

// const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const DB_PASS = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "Esmun";
const HOST = process.env.DB_HOST ? "localhost" : "db";

const db = new Sequelize("mandrilapi", "root", DB_PASS, {
  host: HOST,
  dialect: "mysql",
});

console.log("Sequelize defined");

module.exports = db;

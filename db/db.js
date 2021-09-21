const { Sequelize } = require("sequelize");

console.log("In db");

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});

console.log("Sequelize defined");

module.exports = db;

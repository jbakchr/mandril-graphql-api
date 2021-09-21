const { DataTypes, Model } = require("sequelize");

const db = require("../db/db");

const Quote = require("./Quote");
const Character = require("./Character");
const Actor = require("./Actor");
const Warning = require("./Warning");

// Quote
Quote.belongsTo(Character);

// Charactor
Character.hasMany(Quote);
Character.belongsTo(Actor);

// Actor
Actor.hasMany(Character);

module.exports = {
  Quote,
  Character,
  Actor,
  Warning,
};

const { DataTypes, Model } = require("sequelize");

const db = require("../db/db");

const Quote = require("./Quote");
const Character = require("./Character");
const Actor = require("./Actor");

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
};

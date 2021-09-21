const { DataTypes, Model } = require("sequelize");

const db = require("../db/db");

class Character extends Model {}
Character.init(
  {
    character: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "character",
    timestamps: false,
  }
);

module.exports = Character;

const { DataTypes, Model } = require("sequelize");

const db = require("../db/db");

class Actor extends Model {}
Actor.init(
  {
    actor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    modelName: "actor",
  }
);

module.exports = Actor;

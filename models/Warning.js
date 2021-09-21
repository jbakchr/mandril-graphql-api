const { DataTypes, Model } = require("sequelize");

const db = require("../db/db");

class Warning extends Model {}
Warning.init(
  {
    // Model attributes are defined here
    warning: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    modelName: "warning", // We need to choose the model name
    timestamps: false,
  }
);

module.exports = Warning;

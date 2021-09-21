const { DataTypes, Model } = require("sequelize");

const db = require("../db/db");

class Quote extends Model {}
Quote.init(
  {
    // Model attributes are defined here
    quote: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    modelName: "quote", // We need to choose the model name
    timestamps: false,
  }
);

module.exports = Quote;

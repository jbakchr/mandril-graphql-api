const { DataTypes, Model } = require("sequelize");

const db = require("../db/db");

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    modelName: "user",
  }
);

module.exports = User;

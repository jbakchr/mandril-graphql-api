const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/Models");

module.exports = {
  Mutation: {
    register: async (_, { email, password }) => {
      // Check if user exists
      const existingUser = await User.findOne({
        where: {
          email,
        },
      });

      console.log("existingUser:", existingUser);

      if (existingUser) {
        throw new UserInputError("username is taken", {
          error: {
            username: "This username is taken",
          },
        });
      }

      // hash password
      password = await bcrypt.hash(password, 12);

      // Create user
      const user = await User.create({
        email,
        password,
      });

      // Create token
      const secret = process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : "Sut min numse";

      const token = jwt.sign(
        {
          userId: user.id,
        },
        secret,
        { expiresIn: "7d" }
      );

      return {
        id: user.id,
        token,
      };
    },
  },
};

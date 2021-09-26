const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/Models");

const getUser = async (email) => {
  let user;
  try {
    user = await User.findOne({
      where: {
        email,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong", { error });
  }

  return user;
};

const checkPassword = async (password, user) => {
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    throw new Error("Something went wrong", { error });
  }
  return isValidPassword;
};

module.exports = {
  Mutation: {
    register: async (_, { email, password }) => {
      // Check if user exists
      const existingUser = await getUser(email);

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
    login: async (_, { email, password }) => {
      // Check for existing user
      let user = await getUser(email);

      if (!user) {
        throw new UserInputError("User not found");
      }

      // Check password
      let isValidPassword = await checkPassword(password, user);

      if (!isValidPassword) {
        throw new Error("Unable to login");
      }

      // Create token
      const secret = process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : "Sut min numse";

      const token = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });

      return {
        id: user.id,
        token,
      };
    },
  },
};

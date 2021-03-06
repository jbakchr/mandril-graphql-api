const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/Models");

const getUser = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Unable to verify user", { error });
  }
};

const checkPassword = async (password, user) => {
  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword;
  } catch (error) {
    throw new Error("Something went wrong", { error });
  }
};

const generateToken = (user) => {
  // Get jwt secret
  const secret = process.env.JWT_SECRET
    ? process.env.JWT_SECRET
    : "Sut min numse";

  // Sign and return token
  const token = jwt.sign(
    {
      userId: user.id,
    },
    secret,
    { expiresIn: "7d" }
  );

  return token;
};

module.exports = {
  Mutation: {
    register: async (_, { credentials: { email, password } }) => {
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
      const token = generateToken(user);

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
      const token = generateToken(user);

      return {
        id: user.id,
        token,
      };
    },
  },
};

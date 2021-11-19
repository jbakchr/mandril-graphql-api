const {
  redisClientGetAsync,
  redisClientSetAsync,
  redisClientSetExAsync,
} = require("../../db/redisClient");

const checkAuth = require("../../utils/check-auth");
const { Quote, Character, Actor } = require("../../models/Models");

const findQuote = async (quote) => {
  try {
    const existingQuote = await Quote.findOne({
      where: {
        quote,
      },
    });
    return existingQuote;
  } catch (error) {
    throw new Error("Unable to find quote");
  }
};

const findCharacterById = async (characterId) => {
  try {
    const character = await Character.findByPk(characterId);
    return character;
  } catch (error) {
    throw new Error("Unable to find character");
  }
};

module.exports = {
  Query: {
    getQuotes: async () => {
      const cachedQuotes = await redisClientGetAsync("quotes:all");

      if (cachedQuotes) {
        return JSON.parse(cachedQuotes);
      }

      const quotes = await Quote.findAll({
        include: [
          {
            model: Character,
            include: [
              {
                model: Actor,
              },
            ],
          },
        ],
      });

      await redisClientSetExAsync(
        "quotes:all",
        60 * 60 * 24,
        JSON.stringify(quotes)
      );

      return quotes;
    },
    getQuote: async (_, { quoteId }) => {
      const quote = await Quote.findByPk(quoteId, {
        include: [
          {
            model: Character,
            include: [
              {
                model: Actor,
              },
            ],
          },
        ],
      });
      return quote;
    },
  },
  Mutation: {
    addQuote: async (_, { quoteInput: { quote, characterId } }, context) => {
      // Check if user is authenticated
      checkAuth(context);

      // Check if quote already exist
      const existingQuote = await findQuote(quote);

      if (existingQuote) {
        throw new Error("Quote already exists");
      }

      // Check if character exist
      const character = await findCharacterById(characterId);

      if (!character) {
        throw new Error("No character with that id exist");
      }

      // Create new quote
      let newQuote;
      try {
        newQuote = await Quote.create({
          quote,
          characterId,
        });
      } catch (error) {
        throw new Error("Unable to add new quote");
      }

      return newQuote;
    },
  },
};

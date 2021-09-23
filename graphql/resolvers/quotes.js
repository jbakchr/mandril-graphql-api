const {
  redisClientGetAsync,
  redisClientSetAsync,
  redisClientSetExAsync,
} = require("../../db/redisClient");

const { Quote, Character, Actor } = require("../../models/Models");

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

      await redisClientSetExAsync("quotes:all", 60 * 60 * 24);

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
};

const {
  redisClientGetAsync,
  redisClientSetAsync,
} = require("../../db/redisClient");

const { Quote, Character, Actor } = require("../../models/Models");

module.exports = {
  Query: {
    getQuotes: async () => {
      const cachedQuotes = await redisClientGetAsync("quotes:all");

      if (cachedQuotes) {
        console.log("sending cached quotes");
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

      await redisClientSetAsync("quotes:all", JSON.stringify(quotes));

      console.log("No quotes cached. Sending fetched quotes");

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

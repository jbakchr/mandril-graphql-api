const quotesResolvers = require("./quotes");
const charactersResolvers = require("./characters");
const actorsResolvers = require("./actors");

module.exports = {
  Query: {
    ...quotesResolvers.Query,
    ...charactersResolvers.Query,
    ...actorsResolvers.Query,
  },
};

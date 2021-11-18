const quotesResolvers = require("./quotes");
const charactersResolvers = require("./characters");
const actorsResolvers = require("./actors");
const warningsResolvers = require("./warnings");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...quotesResolvers.Query,
    ...charactersResolvers.Query,
    ...actorsResolvers.Query,
    ...warningsResolvers.Query,
  },
  Mutation: {
    ...quotesResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};

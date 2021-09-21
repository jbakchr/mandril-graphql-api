const { gql } = require("apollo-server");

const typeDefs = gql`
  "Quote made by character"
  type Quote {
    "Quote id"
    id: ID!
    "The quote"
    quote: String!
    "The Character who made the quote"
    character: Character
  }

  type Character {
    id: ID!
    character: String!
    quotes: [Quote]
    actor: Actor
  }

  type Actor {
    id: ID!
    actor: String!
    characters: [Character]
  }

  type Warning {
    id: ID!
    warning: String!
  }

  type Query {
    "Get all quotes"
    getQuotes: [Quote]
    getQuote(quoteId: ID!): Quote

    getCharacters: [Character]
    getCharacter(characterId: ID!): Character

    getActors: [Actor]
    getActor(actorId: ID!): Actor
  }
`;

module.exports = typeDefs;

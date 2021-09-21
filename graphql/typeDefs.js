const { gql } = require("apollo-server");

const typeDefs = gql`
  type Quote {
    id: ID!
    quote: String!
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
  type Query {
    getQuotes: [Quote]
    getQuote(quoteId: ID!): Quote
    getCharacters: [Character]
    getCharacter(characterId: ID!): Character
    getActors: [Actor]
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server");

const typeDefs = gql`
  "Quote made by mandril character"
  type Quote {
    "Quote id"
    id: ID!
    "The quote"
    quote: String!
    "The Character who made the quote"
    character: Character
  }

  "Mandril characters"
  type Character {
    "Character id"
    id: ID!
    "The character"
    character: String!
    "Characteristics of the character"
    characteristics: String
    "Quotes made by character"
    quotes: [Quote]
    "The actor playing the character"
    actor: Actor
  }

  "The actors in mandrillen"
  type Actor {
    "Actor id"
    id: ID!
    "The actor"
    actor: String!
    "Characters played by the actor"
    characters: [Character]
  }

  "The mandril warnings"
  type Warning {
    "Warning id"
    id: ID!
    "The warning"
    warning: String!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    token: String
  }

  type Query {
    "Get all quotes"
    getQuotes: [Quote]
    "Get quote by id"
    getQuote(quoteId: ID!): Quote

    "Get all mandril characters"
    getCharacters: [Character]
    "Get specific character by id"
    getCharacter(characterId: ID!): Character

    "Get all actors"
    getActors: [Actor]
    "Get actor by id"
    getActor(actorId: ID!): Actor

    "Get all warnings"
    getWarnings: [Warning]
    "Get specific warning"
    getWarning(warningId: ID!): Warning
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;

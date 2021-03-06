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

  "Users"
  type User {
    "User id"
    id: ID!
    "Users email"
    email: String!
    "Hashed password"
    password: String!
    "Token"
    token: String
  }

  "Credentials for register and login"
  input Credentials {
    "email"
    email: String!
    "password"
    password: String!
  }

  input QuoteInput {
    quote: String!
    characterId: Int!
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
    "Register user by email and password"
    register(credentials: Credentials!): User
    "Login user by email and password"
    login(email: String!, password: String!): User

    "Create quote"
    addQuote(quoteInput: QuoteInput!): Quote
  }
`;

module.exports = typeDefs;

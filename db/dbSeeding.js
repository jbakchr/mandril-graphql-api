// models
const { Actor, Character, Quote } = require("../models/Models");

// data
const actorData = require("../data/actor-data.json");
const characterData = require("../data/character-data.json");
const quoteData = require("../data/quote-data.json");

module.exports = async () => {
  // Actor
  Actor.bulkCreate(actorData);

  // Character
  Character.bulkCreate(characterData);

  // Quote
  Quote.bulkCreate(quoteData);
};

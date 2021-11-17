// models
const { Actor, Character, Quote, Warning } = require("../models/Models");

// data
const actorData = require("../data/actor-data.json");
const characterData = require("../data/character-data.json");
const quoteData = require("../data/quote-data.json");
const warningData = require("../data/warning-data.json");

module.exports = async () => {
  // Actor
  await Actor.bulkCreate(actorData);

  // Character
  await Character.bulkCreate(characterData);

  // Quote
  await Quote.bulkCreate(quoteData);

  // Warning
  await Warning.bulkCreate(warningData);
};

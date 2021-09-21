const { Character, Quote, Actor } = require("../../models/Models");

module.exports = {
  Query: {
    getCharacters: async () => {
      const characters = await Character.findAll({
        include: [
          {
            model: Quote,
          },
          {
            model: Actor,
          },
        ],
      });
      return characters;
    },
    getCharacter: async (_, { characterId }) => {
      const character = await Character.findByPk(characterId, {
        include: [
          {
            model: Quote,
          },
          {
            model: Actor,
          },
        ],
      });
      return character;
    },
  },
};

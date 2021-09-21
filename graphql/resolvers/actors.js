const { Actor, Character, Quote } = require("../../models/Models");

module.exports = {
  Query: {
    getActors: async () => {
      const actors = await Actor.findAll({
        include: [
          {
            model: Character,
            include: [
              {
                model: Quote,
              },
            ],
          },
        ],
      });
      console.log(actors);
      return actors;
    },
  },
};

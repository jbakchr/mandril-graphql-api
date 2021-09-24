const { Warning } = require("../../models/Models");

module.exports = {
  Query: {
    getWarnings: async () => {
      const warnings = await Warning.findAll();
      return warnings;
    },
  },
};

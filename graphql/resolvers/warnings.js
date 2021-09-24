const { Warning } = require("../../models/Models");

module.exports = {
  Query: {
    getWarnings: async () => {
      const warnings = await Warning.findAll();
      return warnings;
    },
    getWarning: async (_, { warningId }) => {
      const warning = await Warning.findByPk(warningId);
      return warning;
    },
  },
};

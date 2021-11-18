require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const db = require("./db/db");
const dbSeeding = require("./db/dbSeeding");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

db.sync({ force: true })
  .then(() => {
    server.listen(5000).then(async (res) => {
      await dbSeeding();
      console.log(`🐵 Mandril GraphQL API running at: ${res.url} 🐵`);
    });
  })
  .catch((err) => console.log(err));

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
    server.listen(5000).then((res) => {
      console.log(res.url);
      dbSeeding();
    });
  })
  .catch((err) => console.log(err));

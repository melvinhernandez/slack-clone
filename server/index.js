import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import cors from "cors";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import models from "./models";

const SECRET = "thisissomerandomsecretthatcouldbeanythingiwantlolz";
const SECRET2 = "hahahahacouldbeanythingiwantlolzies";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schemas")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    SECRET,
    SECRET2,
    user: { id: 1 },
  },
});

const app = express();
app.use(cors("*"));
server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
});

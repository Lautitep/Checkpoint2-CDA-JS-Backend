import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import datasource from "./lib/datasource";
import CountryResolver from "./resolvers/country.resolver";

async function startServer() {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({ schema });

  await server.start();

  const app = express();
  app.use(
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server lancé sur http://localhost:4000/`);
  });
}

startServer().catch(error => {
  console.error("Error starting server: ", error);
});

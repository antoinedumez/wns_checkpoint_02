import "reflect-metadata";

import http from "http";
import DataSource from'./db';
import express from 'express';
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { CountryResolver } from "./CountryResolver";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

const start = async (): Promise<void> => {
    const app = express();
    await DataSource.initialize();
    const httpServer = http.createServer(app);

    const schema = await buildSchema({
        resolvers: [CountryResolver],
      });

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    
        context: ({ req, res }) => {
          return { req, res };
        },
      });
  
      await server.start();
      server.applyMiddleware({ app, cors: false, path: "/" });
      httpServer.listen({ port: 4000 }, () =>
        console.log(
          `🚀 Server ready at ${"localhost"}:${4000}${server.graphqlPath}`
        )
      );
};

void start();
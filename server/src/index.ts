require('dotenv').config();

import 'reflect-metadata';
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { QuoteResolver } from './resolvers/quote';

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);

	await orm.getMigrator().up();

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [QuoteResolver],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	});

	apolloServer.applyMiddleware({ app });

	app.listen(process.env.PORT, () => {
		console.log(`server started on localhost:${process.env.PORT}`);
	});

	app.get('/', (_, res) => {
		res.send('Hello World!');
	});
};

main();

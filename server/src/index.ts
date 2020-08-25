import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import { MikroORM } from '@mikro-orm/core';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import mikroConfig from './mikro-orm.config';
import sessionConfig from './session.config';

import { QuoteResolver } from './resolvers/quote';
import { AuthResolver } from './resolvers/auth';

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	await orm.getMigrator().up();

	const app = express();

	app.use(session(sessionConfig));

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [QuoteResolver, AuthResolver],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	});
	apolloServer.applyMiddleware({ app });

	app.listen(process.env.PORT, () => {
		console.log(`server started on localhost:${process.env.PORT}`);
	});

	app.get('/', (_, res) => {
		res.send('hello');
	});
};

main();

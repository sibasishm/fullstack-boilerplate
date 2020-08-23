require('dotenv').config();

import { MikroORM } from '@mikro-orm/core';
import { Quote } from './entities/Quote';
import mikroConfig from './mikro-orm.config';

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);

	await orm.getMigrator().up();

	// const quote = orm.em.create(Quote, { title: 'my first quote.' });
	// await orm.em.persistAndFlush(quote);

	const quotes = await orm.em.find(Quote, {});
	console.log(quotes);
};

main();

import { MikroORM } from '@mikro-orm/core';
import { Quote } from './entities/Quote';

const main = async () => {
	const orm = MikroORM.init({
        entities: [Quote]
		dbName: 'quotebook',
		type: 'postgresql',
		debug: process.env.NODE_ENV !== 'production',
	});
};

main();

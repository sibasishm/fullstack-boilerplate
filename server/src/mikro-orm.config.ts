require('dotenv').config();

import path from 'path';

import { MikroORM } from '@mikro-orm/core';
import { Quote } from './entities/Quote';

export default {
	migrations: {
		path: path.join(__dirname, './migrations'),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	entities: [Quote],
	dbName: 'quotebook',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	type: 'postgresql',
	debug: process.env.NODE_ENV !== 'production',
} as Parameters<typeof MikroORM.init>[0];

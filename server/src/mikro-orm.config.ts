require('dotenv').config();

import path from 'path';

import { MikroORM } from '@mikro-orm/core';
import { Quote } from './entities/Quote';
import { User } from './entities/User';

export default {
	migrations: {
		path: path.join(__dirname, './migrations'),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	entities: [Quote, User],
	dbName: 'quotebook',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	type: 'postgresql',
	debug: process.env.NODE_ENV !== 'production',
} as Parameters<typeof MikroORM.init>[0];

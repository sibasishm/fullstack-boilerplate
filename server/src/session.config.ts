require('dotenv').config();

import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

export default {
	name: 'qid',
	store: new RedisStore({
		client: redisClient,
		disableTouch: true,
		disableTTL: true,
	}),
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
		httpOnly: true,
		sameSite: 'lax', //csrf
		secure: process.env.NODE_ENV === 'production', //cookies only works in https
	},
	secret: process.env.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
} as Parameters<typeof session>[0];

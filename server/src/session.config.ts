require('dotenv').config();

import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

export default {
	store: new RedisStore({ client: redisClient }),
	secret: process.env.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
} as Parameters<typeof session>[0];

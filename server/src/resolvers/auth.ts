import {
	Resolver,
	Mutation,
	InputType,
	Field,
	Arg,
	Ctx,
	ObjectType,
} from 'type-graphql';
import { hash, verify } from 'argon2';

import { MyContext } from 'src/types';
import { User } from '../entities/User';

@InputType()
class Credentials {
	@Field()
	username: string;

	@Field()
	password: string;
}

@ObjectType()
class FieldError {
	@Field()
	name: string;

	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: [FieldError];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class AuthResolver {
	@Mutation(() => UserResponse)
	async register(
		@Arg('credentials') { username, password }: Credentials,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		if (username.length <= 4) {
			return {
				errors: [
					{
						name: 'username',
						message: 'Username must be more than 4 characters.',
					},
				],
			};
		}

		if (password.length <= 6) {
			return {
				errors: [
					{
						name: 'password',
						message: 'Password must be more than 6 characters.',
					},
				],
			};
		}

		const hashedPassword = await hash(password);
		const user = em.create(User, { username, password: hashedPassword });

		try {
			await em.persistAndFlush(user);
		} catch (err) {
			// duplicate username error
			if (err.code === '23505') {
				return {
					errors: [
						{
							name: 'username',
							message: 'User already exists.',
						},
					],
				};
			}
		}

		req.session.userId = user.id;

		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('credentials') { username, password }: Credentials,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		const user = await em.findOne(User, { username });

		if (!user) {
			return {
				errors: [{ name: 'username', message: 'User does not exist.' }],
			};
		}

		const isValidPassword = await verify(user.password, password);

		if (!isValidPassword) {
			return {
				errors: [{ name: 'password', message: 'Invalid credentails.' }],
			};
		}

		req.session.userId = user.id;

		return { user };
	}
}

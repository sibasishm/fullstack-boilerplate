import { Resolver, Query, Ctx } from 'type-graphql';

import { User } from '../entities/User';
import { MyContext } from 'src/types';

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	me(@Ctx() { em, req }: MyContext): Promise<User | null> {
		return em.findOne(User, { id: req.session.userId });
	}
}

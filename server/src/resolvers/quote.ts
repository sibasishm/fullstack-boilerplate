import { Resolver, Query, Ctx, Arg, Int } from 'type-graphql';

import { Quote } from '../entities/Quote';
import { MyContext } from 'src/types';

@Resolver()
export class QuoteResolver {
	@Query(() => [Quote])
	quotes(@Ctx() { em }: MyContext): Promise<Quote[]> {
		return em.find(Quote, {});
	}

	@Query(() => Quote, { nullable: true })
	quote(
		@Arg('id', () => Int) id: number,
		@Ctx() { em }: MyContext
	): Promise<Quote | null> {
		return em.findOne(Quote, { id });
	}
}

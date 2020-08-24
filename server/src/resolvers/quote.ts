import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';

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
		@Arg('id') id: number,
		@Ctx() { em }: MyContext
	): Promise<Quote | null> {
		return em.findOne(Quote, { id });
	}

	@Mutation(() => Quote)
	async createQuote(
		@Arg('title') title: string,
		@Ctx() { em }: MyContext
	): Promise<Quote> {
		const quote = em.create(Quote, { title });
		await em.persistAndFlush(quote);

		return quote;
	}

	@Mutation(() => Quote, { nullable: true })
	async updatedQuote(
		@Arg('id') id: number,
		@Arg('title') title: string,
		@Ctx() { em }: MyContext
	): Promise<Quote | null> {
		const quote = await em.findOne(Quote, { id });

		if (!quote) return null;

		quote.title = title;
		await em.persistAndFlush(quote);

		return quote;
	}

	@Mutation(() => Boolean)
	async deleteQuote(
		@Arg('id') id: number,
		@Ctx() { em }: MyContext
	): Promise<boolean> {
		try {
			await em.nativeDelete(Quote, { id });
		} catch (err) {
			console.log(err);
			return false;
		}

		return true;
	}
}

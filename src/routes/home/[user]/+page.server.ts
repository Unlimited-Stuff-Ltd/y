import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { posts, users } from '$lib/server/db/schema';
import { desc, eq, ne } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const postsArray = db
		.select()
		.from(posts)
		.orderBy(desc(posts.recommendations))
		.limit(3)
		.where(ne(posts.userId, params.user));
	return { posts: postsArray };
};

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		const recommended = Boolean(data.get('recommended'));
		try {
			const post = await db
				.select({ recommendations: posts.recommendations })
				.from(posts)
				.where(eq(posts.id, id));
			const user = await db
				.select({ recommendations: users.recommendations })
				.from(users)
				.where(eq(users.username, params.user));
			let newRecommendationsPosts = post[0].recommendations ?? 0;
			const newRecommendationsUser = JSON.parse(user[0].recommendations ?? '[]');
			console.log(recommended);
			if (newRecommendationsUser.includes(id)) {
				return;
			}
			newRecommendationsPosts++;
			newRecommendationsUser.push(id);
			await db
				.update(posts)
				.set({
					recommendations: newRecommendationsPosts
				})
				.where(eq(posts.id, id));
			await db
				.update(users)
				.set({
					recommendations: JSON.stringify(newRecommendationsUser)
				})
				.where(eq(users.username, params.user));
		} catch (error) {
			console.log(error);
			redirect(303, `/home/${params.user}?e=2`);
		}
	}
} satisfies Actions;

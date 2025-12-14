import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const content = String(data.get('contents'));
		const image = data.get('image');
		try {
			if (image) {
				await db.insert(posts).values({
					userId: params.user,
					content,
					image: String(image)
				});
			} else {
				await db.insert(posts).values({
					userId: params.user,
					content
				});
			}
		} catch (error) {
			console.log(error);
			redirect(303, `/home/${params.user}?e=3`);
		}
		redirect(303, `/home/${params.user}`);
	}
} satisfies Actions;

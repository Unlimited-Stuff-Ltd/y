import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { success, error } from '$lib/server/db/log';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const content = String(data.get('contents'));
		const image = data.get('image');
		let post;
		try {
			if (image) {
				post = await db
					.insert(posts)
					.values({
						userId: params.user,
						content,
						image: String(image)
					})
					.returning({ id: posts.id });
			} else {
				post = await db
					.insert(posts)
					.values({
						userId: params.user,
						content
					})
					.returning({ id: posts.id });
			}
		} catch (errorV) {
			error(
				request.headers.get('user-agent') ?? 'not found',
				'write post',
				`${post?.[0].id ?? ''} - ${content} - ${params.user}`,
				errorV
			);
			redirect(303, `/home/${params.user}?e=3`);
		}
		success(
			request.headers.get('user-agent') ?? 'not found',
			'write post',
			`${post?.[0].id ?? ''} - ${content} - ${params.user}`
		);
		redirect(303, `/home/${params.user}`);
	}
} satisfies Actions;

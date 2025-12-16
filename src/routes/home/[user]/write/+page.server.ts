import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { posts, users } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { success, error } from '$lib/server/db/log';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const content = String(data.get('contents'));
		const image = data.get('image');
		let post;
		try {
			const user = (await db.select().from(users).where(eq(users.username, params.user)))[0];
			if (image) {
				post = await db
					.insert(posts)
					.values({
						userId: user.id,
						userDisplayName: user.displayName,
						userIcon: user.icon,
						content,
						image: String(image)
					})
					.returning({ id: posts.id });
			} else {
				post = await db
					.insert(posts)
					.values({
						userId: params.user,
						userDisplayName: user.displayName,
						userIcon: user.icon,
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

import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { success, error } from '$lib/server/db/log';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const name = String(data.get('displayName'));
		const file = String(data.get('file'));

		try {
			if (file && name) {
				await db
					.update(users)
					.set({
						displayName: name,
						icon: file
					})
					.where(eq(users.username, params.user));
			} else if (name && !file) {
				await db
					.update(users)
					.set({
						displayName: name
					})
					.where(eq(users.username, params.user));
			} else if (file && !name) {
				await db.update(users).set({ icon: file });
			}
		} catch (errorV) {
			error(
				request.headers.get('user-agent') ?? 'not found',
				'update account',
				`${name} - ${params.user}`,
				errorV
			);
			redirect(303, `/home/${params.user}?e=2`);
		}
		success(
			request.headers.get('user-agent') ?? 'not found',
			'update account',
			`${name} - ${params.user}`
		);
		redirect(303, `/home/${params.user}/account`);
	}
} satisfies Actions;

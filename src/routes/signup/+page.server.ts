import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		try {
			const user = await db
				.insert(users)
				.values({
					username,
					icon: 'https://y.unlimitedstuffltd.com/placeholder.png'
				})
				.returning({ id: users.id });
			localStorage.setItem('user-code', user[0].id);
		} catch {
			localStorage.removeItem('user-code');
			redirect(303, '/?e=2');
		}
		redirect(303, '/home');
	}
} satisfies Actions;

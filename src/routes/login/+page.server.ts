import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const code = String(data.get('code'));
		try {
			const user = await db.select().from(users).where(eq(users.id, code));
			if (user.length < 1) {
				redirect(303, '/?e=1');
			}
			localStorage.setItem('user-code', code);
			redirect(303, '/home');
		} catch (error) {
			console.log(error);
			redirect(303, '/?e=4');
		}
	}
} satisfies Actions;

import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const name = String(data.get('displayName'));
		const file: any = data.get('file');
		const arrayBuffer = await file.arrayBuffer();
		try {
			if (file.size > 0 && name) {
				await db
					.update(users)
					.set({
						displayName: name,
						icon: new Uint8Array(arrayBuffer).toString()
					})
					.where(eq(users.username, params.user));
			} else if (name && file.size === 0) {
				await db
					.update(users)
					.set({
						displayName: name
					})
					.where(eq(users.username, params.user));
			} else if (file.size > 0 && !name) {
				await db.update(users).set({ icon: new Uint8Array(arrayBuffer).toString() });
			}
		} catch (error) {
			console.log(error);
			redirect(303, `/home/${params.user}?e=2`);
		}
		redirect(303, `/home/${params.user}/account`);
	}
} satisfies Actions;

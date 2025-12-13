import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const username = params.user;
	try {
		await db.delete(users).where(eq(users.username, username));
	} catch (error) {
		console.log(error);
		redirect(303, '/?e=5');
	}
};

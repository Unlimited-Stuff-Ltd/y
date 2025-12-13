import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const username = params.user;
	let user;
	try {
		user = db.select().from(users).where(eq(users.username, username));
	} catch (error) {
		console.log(error);
		redirect(303, `/users/${username}?e=1`);
	}
	return { user };
};

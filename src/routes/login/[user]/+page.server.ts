import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const username = params.user;
	let user;
	try {
		user = await db.select().from(users).where(eq(users.username, username));
	} catch (error) {
		console.log(error);
		redirect(303, '/?e=4');
	}
	if (user.length < 1) {
		redirect(303, '/?e=1');
	}
	return { username };
};

import type { LayoutServerLoad } from './$types';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ params }) => {
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
};

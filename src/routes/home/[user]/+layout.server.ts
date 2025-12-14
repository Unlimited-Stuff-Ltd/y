import type { LayoutServerLoad } from './$types';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ params }) => {
	const username = params.user;
	let user;
	try {
		user = await db.select().from(users).where(eq(users.username, username));
	} catch (error) {
		console.log(error);
		return { code: 4, user };
	}
	if (user.length < 1) {
		return { code: 1, user };
	}
	return { code: 0, user };
};

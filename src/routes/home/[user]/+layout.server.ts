import type { LayoutServerLoad } from './$types';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { error } from '$lib/server/db/log';

export const load: LayoutServerLoad = async ({ request, params }) => {
	const username = params.user;
	let user;
	try {
		user = await db.select().from(users).where(eq(users.username, username));
	} catch (errorV) {
		error(
			request.headers.get('user-agent') ?? 'not found',
			'get account details from [user]/layout',
			username,
			errorV
		);
		return { code: 4, user };
	}
	if (user.length < 1) {
		return { code: 1, user };
	}
	return { code: 0, user };
};

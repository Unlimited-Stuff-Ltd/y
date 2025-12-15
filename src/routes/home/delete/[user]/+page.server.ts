import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { success, error } from '$lib/server/db/log';

export const load: PageServerLoad = async ({ request, params }) => {
	const username = params.user;
	try {
		await db.delete(users).where(eq(users.username, username));
	} catch (errorV) {
		error(request.headers.get('user-agent') ?? 'not found', 'delete', username, errorV);
		redirect(303, '/?e=5');
	}
	success(request.headers.get('user-agent') ?? 'not found', 'delete', username);
};

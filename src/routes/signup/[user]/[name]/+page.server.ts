import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { success, error } from '$lib/server/db/log';

export const load: PageServerLoad = async ({ request, params }) => {
	const username = params.user;
	const displayName = params.name;
	let user;
	try {
		user = await db
			.insert(users)
			.values({
				username,
				displayName
			})
			.returning({ id: users.id });
	} catch (errorV) {
		error(
			request.headers.get('user-agent') ?? 'not found',
			'sign-up',
			`${user?.[0].id ?? ''} - ${username} - ${displayName}`,
			errorV
		);
		redirect(303, '/?e=2');
	}
	success(
		request.headers.get('user-agent') ?? 'not found',
		'sign-up',
		`${user?.[0].id ?? ''} - ${username} - ${displayName}`
	);

	return { username };
};

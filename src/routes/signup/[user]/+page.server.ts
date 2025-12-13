import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const username = params.user;
	try {
		await db.insert(users).values({
			username,
			icon: 'https://y.unlimitedstuffltd.com/placeholder.png'
		});
	} catch (error) {
		console.log(error);
		redirect(303, '/?e=2');
	}

	return { username };
};

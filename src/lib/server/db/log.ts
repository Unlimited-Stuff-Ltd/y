import { db } from '$lib/server/db';
import { logs } from '$lib/server/db/schema';

export async function success(userAgent: string, action: string, info: string) {
	await db.insert(logs).values({
		userAgent,
		action,
		info
	});
}

export async function error(userAgent: string, action: string, info: string, error: any) {
	await db.insert(logs).values({
		userAgent,
		action,
		info,
		success: 0,
		error: JSON.stringify(error)
	});
}

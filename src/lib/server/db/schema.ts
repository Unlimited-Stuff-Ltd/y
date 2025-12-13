import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

function randomCode(): string {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let code = '';
	for (let i = 0; i < 6; i++) {
		const num = Math.floor(Math.random() * chars.length);
		code += chars[num];
	}
	return code;
}

export const users = sqliteTable('users', {
	username: text('username').primaryKey(),
	icon: text('icon')
});

export const posts = sqliteTable('posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').notNull(),
	content: text('content').notNull(),
	image: text('image')
});

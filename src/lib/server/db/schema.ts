import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import defaultJSON from '$lib/assets/default.json';

export const users = sqliteTable('users', {
	username: text('username').primaryKey(),
	displayName: text('display_name').notNull(),
	icon: text('icon')
		.notNull()
		.$defaultFn(() => defaultJSON.image),
	id: text('id')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	recommendations: text('recommendations')
		.notNull()
		.$defaultFn(() => '[]')
});

export const posts = sqliteTable('posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').notNull(),
	content: text('content').notNull(),
	image: text('image'),
	date: text('date')
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
	recommendations: integer('recommendations')
		.notNull()
		.$defaultFn(() => 0)
});

export const logs = sqliteTable('logs', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userAgent: text('user_agent').notNull(),
	date: text('date')
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
	action: text('action').notNull(),
	success: integer('success').$defaultFn(() => 1),
	error: text('error'),
	info: text('info').notNull()
});

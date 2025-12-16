import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	username: text('username').primaryKey(),
	displayName: text('display_name').notNull(),
	icon: text('icon')
		.notNull()
		.$defaultFn(() => 'icon')
		.$defaultFn(() => 'https://y.unlimitedstuffltd.com/placeholder.png'),
	id: text('id')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	recommendations: text('recommendations')
		.notNull()
		.$defaultFn(() => '[]'),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
	updatedAt: text('updated_at').$onUpdateFn(() => new Date().toISOString())
});

export const posts = sqliteTable('posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').notNull(),
	userDisplayName: text('user_display_name').notNull(),
	userIcon: text('user_icon').notNull(),
	content: text('content').notNull(),
	image: text('image'),
	date: text('date')
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
	recommendations: integer('recommendations')
		.notNull()
		.$defaultFn(() => 0),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.$defaultFn(() => new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
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
	info: text('info').notNull(),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.$defaultFn(() => new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

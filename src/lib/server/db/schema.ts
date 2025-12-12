import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => randomCode()),
    username: text('username').unique().notNull(),
    icon: text('icon')
});

export const posts = sqliteTable('posts', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull(),
    content: text('content').notNull(),
    image: text('image')
});
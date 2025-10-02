import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { FRONTMATTER_TAGS } from './constants'

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]]

const TAGS_NAMES = [...FRONTMATTER_TAGS]

const baseSchema = z.object({
	title: z.string(),
	slug: z.string(),
	description: z.string(),
	date: z.date(),
	lastUpdated: z.date(),
	image: z.string().optional(),
	searchIndex: z.boolean().optional().default(true),
})

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdx', base: './content/blog' }),
	schema: baseSchema.extend({
		tags: z.array(z.enum(zodEnum(TAGS_NAMES))),
	}),
})

const frame = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdx', base: './content/frame' }),
	schema: baseSchema.extend({
		tags: z.array(z.enum(zodEnum(TAGS_NAMES))).default([]),
	}),
})

export const collections = {
	blog,
	frame,
}

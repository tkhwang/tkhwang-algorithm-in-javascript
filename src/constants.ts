type MapKey<T extends Map<any, any>> = T extends Map<infer K, any> ? K : never

/**
 * Metadata for your site
 */
export const SITE: Record<string, string> = {
	/**
	 * Base URL of your site, used in sitemap generation
	 */
	url: 'https://algorithm-in-javascript.netlify.app',
	/**
	 * Site-wide title
	 */
	title: 'Algorithm in JavaScript',
	/**
	 * Used on index page and as a fallback if no title is set
	 */
	titleDefault: 'Algorithm in JavaScript - LeetCode Solutions & Patterns',
	/**
	 * Used in meta tags, RSS feed, and other places
	 */
	description: 'Explore LeetCode solutions, algorithm patterns, and problem-solving techniques using JavaScript. Learn to optimize code and master data structures.',
	/**
	 * Language used in the <html> tag
	 */
	lang: 'en-US',
	/**
	 * Name of the image inside `public` folder that should be used as a default og:image
	 */
	defaultOgImage: '/og-image.png',
	/**
	 * Default author name that gets added to meta tags
	 */
	defaultAuthor: 'tkhwang',
}

interface Header {
	internal: Array<{ title: string, url: string }>
	external: Array<{ title: string, url: string, props?: Record<string, unknown> }>
}

/**
 * Links used in the header
 */
export const HEADER: Header = {
	/**
	 * Internal links to other subpages shown in the header navigation
	 */
	internal: [
		{
			title: 'Blog',
			url: '/blog/',
		},
	],
	/**
	 * Arbitrary list of links (e.g. social media) shown on the right side of the header
	 */
	external: [],
}

/**
 * A map of name - slug pairs
 */
export const FRONTMATTER_TAGS = new Map(
	[
		['General', 'general'] as const,
		['Coding', 'coding'] as const,
		['MDX', 'mdx'] as const,
		['Open Source', 'open-source'] as const,
		['set', 'set'] as const,
	],
)

export type FrontmatterTag = MapKey<typeof FRONTMATTER_TAGS>

export const SKIP_NAV_ID = 'skip-to-content'

/**
 * Available "asides" that can be used in MDX files
 */
export const ASIDE_TYPES = ['note', 'tip', 'caution', 'danger'] as const
export type AsideType = (typeof ASIDE_TYPES)[number]

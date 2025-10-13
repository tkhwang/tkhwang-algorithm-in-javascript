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
	description:
    'Concise JavaScript walkthroughs for LeetCode challenges, highlighting the reasoning bridge from problem statement to working solution.',
	/**
	 * Language used in the <html> tag
	 */
	lang: 'ko-KR',
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
	external: Array<{
		title: string
		url: string
		props?: Record<string, unknown>
	}>
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
			title: 'Post',
			url: '/blog/',
		},
		{
			title: 'Frame',
			url: '/frame/',
		},
		{
			title: 'Tags',
			url: '/tags/',
		},
	],
	/**
	 * Arbitrary list of links (e.g. social media) shown on the right side of the header
	 */
	external: [],
}

/**
 * Available tags for blog posts
 */
export const FRONTMATTER_TAGS = [
	'general',
	'coding',
	'mdx',
	'open-source',
	'set',
	'dynamic-programming',
	'stack',
	'sort',
	'hash',
	'linked-list',
	'heap',
	'binary-search',
	'tree',
	'graph-dfs',
	'sliding-window',
	'tree-bfs',
	'tree-dfs',
	'backtracking',
	'array',
	'two-pointers',
] as const

export type FrontmatterTag = typeof FRONTMATTER_TAGS[number]

export const SKIP_NAV_ID = 'skip-to-content'

/**
 * Available "asides" that can be used in MDX files
 */
export const ASIDE_TYPES = ['note', 'tip', 'caution', 'danger'] as const
export type AsideType = (typeof ASIDE_TYPES)[number]

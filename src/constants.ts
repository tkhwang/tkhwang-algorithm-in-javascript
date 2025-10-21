/**
 * Metadata for your site
 */
export const SITE: Record<string, string> = {
	/**
	 * Base URL of your site, used in sitemap generation
	 */
	url: 'https://algorithm-in-javascript.vercel.app',
	/**
	 * Site-wide title
	 */
	title: 'Algorithm.js',
	/**
	 * Used on index page and as a fallback if no title is set
	 */
	titleDefault: 'Algorithm.js | 패턴별 알고리즘 가이드',
	/**
	 * Used in meta tags, RSS feed, and other places
	 */
	description: 'JavaScript로 리트코드 패턴을 정리하는 알고리즘 가이드. Learn LeetCode patterns in JavaScript with Algorithm.js.',
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
			title: '📘 프레임',
			url: '/frame/',
		},
		{
			title: '📚 단일 패턴',
			url: '/type/basic/',
		},
		{
			title: '🚀 복합 패턴',
			url: '/type/application/',
		},
		{
			title: '주제별 탐색',
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
	'array',
	'backtrack',
	'binary-search',
	'coding',
	'difference-array',
	'dynamic-programming',
	'general',
	'general-binary-search',
	'graph-dfs',
	'greedy',
	'hash',
	'heap',
	'linked-list',
	'mdx',
	'monotonic-stack',
	'open-source',
	'prime-sieve-of-eratosthenes',
	'prefix-sum',
	'set',
	'sliding-window',
	'sort',
	'stack',
	'tree',
	'tree-bfs',
	'tree-dfs',
	'two-pointers',
] as const

export type FrontmatterTag = typeof FRONTMATTER_TAGS[number]

export const FRONTMATTER_TYPES = ['basic', 'application'] as const
export type FrontmatterType = (typeof FRONTMATTER_TYPES)[number]

export const SKIP_NAV_ID = 'skip-to-content'

/**
 * Available "asides" that can be used in MDX files
 */
export const ASIDE_TYPES = ['note', 'tip', 'caution', 'danger'] as const
export type AsideType = (typeof ASIDE_TYPES)[number]

import type { Options as AutolinkHeadingsOptions } from 'rehype-autolink-headings'
import type { Options as ExternalLinkOptions } from 'rehype-external-links'
import { copyFile } from 'node:fs/promises'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import remarkSandpack from '@lekoarts/remark-sandpack'
import tailwindcss from '@tailwindcss/vite'
import { imageService } from '@unpic/astro/service'
import expressiveCode from 'astro-expressive-code'
import { defineConfig, fontProviders } from 'astro/config'
import { toString } from 'hast-util-to-string'
import { h, s } from 'hastscript'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkSmartypants from 'remark-smartypants'
import { SITE } from './src/constants'
import { remarkAsides } from './src/remark'
import { pagefindIntegration } from './src/utils'

function sitemapAliasIntegration() {
	return {
		name: 'sitemap-alias',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const source = new URL('./sitemap-index.xml', dir)
				const destination = new URL('./sitemap.xml', dir)
				try {
					await copyFile(source, destination)
					logger.info('`sitemap.xml` created as alias of `sitemap-index.xml`')
				} catch (error) {
					logger.warn(`Failed to create sitemap.xml alias: ${(error as Error).message}`)
				}
			},
		},
	}
}

export default defineConfig({
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: 'IBM Plex Sans',
				weights: ['400', '500', '600'],
				subsets: ['latin'],
				cssVariable: '--font-plex-sans',
			},
		],
	},
	output: 'static',
	trailingSlash: 'always',
	site: SITE.url,
	integrations: [expressiveCode(), mdx(), sitemap(), pagefindIntegration(), react(), sitemapAliasIntegration()],
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		service: imageService(),
	},
	devToolbar: {
		enabled: false,
	},
	markdown: {
		// @ts-expect-error: Astro types don't match remark plugin
		remarkPlugins: [[remarkSmartypants, { backticks: false }], remarkDirective, remarkAsides, [remarkSandpack, { componentName: ['Playground'] }]],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow'],
					content: { type: 'text', value: ' (opens in a new window)' },
					properties: { className: ['external_link'] },
					contentProperties: { className: ['sr-only'] },
				} satisfies ExternalLinkOptions,
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'after',
					group() {
						return h('.markdown-heading')
					},
					headingProperties() {
						return { tabIndex: -1 }
					},
					properties(node: any) {
						return { ariaLabel: `Permalink: ${toString(node)}`, className: 'anchor' }
					},
					content() {
						return h('svg', { className: 'anchor-icon', viewBox: '0 0 16 16', ariaHidden: true }, [
							s('path', { d: 'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z' }),
						])
					},
				} satisfies AutolinkHeadingsOptions,
			],
		],
	},
})

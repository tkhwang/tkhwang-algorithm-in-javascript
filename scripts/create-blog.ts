import { access, constants, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

async function main() {
	const [, , slugArg, ...titleParts] = process.argv

	if (!slugArg || titleParts.length === 0) {
		console.error('Usage: pnpm create:blog <slug> <title>')
		process.exit(1)
	}

	const slug = slugArg.trim()
	const title = titleParts.join(' ').trim()

	if (slug === '' || title === '') {
		console.error('Both slug and title are required')
		process.exit(1)
	}

	if (slug.includes('/') || slug.includes('..')) {
		console.error('Slug must be a single folder name without path separators')
		process.exit(1)
	}

	const cwd = process.cwd()
	const blogRoot = path.join(cwd, 'content', 'blog')
	const templatePath = path.join(blogRoot, '.template', 'index.mdx')
	const targetDir = path.join(blogRoot, slug)
	const targetFile = path.join(targetDir, 'index.mdx')

	try {
		await access(templatePath, constants.F_OK)
	} catch (error) {
		console.error(`Template not found at ${templatePath}`)
		throw error
	}

	try {
		await mkdir(targetDir, { recursive: false })
	} catch (error: any) {
		if (error?.code === 'EEXIST') {
			console.error(`Directory already exists: ${targetDir}`)
			process.exit(1)
		}
		throw error
	}

	await copyFile(templatePath, targetFile)

	const today = new Date().toISOString().split('T')[0]
	const fileContents = await readFile(targetFile, 'utf-8')
	const updatedContents = fileContents
		.replace(/^title:\s*(?:\S.*)?$/m, `title: ${title}`)
		.replace(/^slug:\s*(?:\S.*)?$/m, `slug: ${slug}`)
		.replace(/^date:\s*(?:\S.*)?$/m, `date: ${today}`)
		.replace(/^lastUpdated:\s*(?:\S.*)?$/m, `lastUpdated: ${today}`)

	await writeFile(targetFile, updatedContents)

	console.log(`Created new blog post at ${path.relative(cwd, targetFile)}`)
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})

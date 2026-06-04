import adapter from '@sveltejs/adapter-cloudflare';
import { relative, sep } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Defaults to rune mode for the project, except for `node_modules`. Can be removed in svelte 6.
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');

			return isExternalLibrary ? undefined : true;
		}
	},
	kit: {
		// Cloudflare Pages (auto-detected output: .svelte-kit/cloudflare — no build
		// output dir setting needed). The whole site is prerendered (see +layout.ts),
		// so the bundled Worker must handle nothing. Excluding every route ("/*")
		// keeps Pages serving pure static assets and avoids the overlapping-rules
		// error in the auto-generated _routes.json.
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['/*']
			}
		})
	}
};

export default config;

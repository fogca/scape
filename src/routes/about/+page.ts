import { redirect } from '@sveltejs/kit';

// Teaser phase: page content is preserved in +page.svelte but not yet public.
// Temporary (307) redirect so it can be restored later without cached 301s.
export function load() {
	throw redirect(307, '/');
}

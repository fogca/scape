import { redirect } from '@sveltejs/kit';
import { products } from '$lib/data/products';

// Prerender the known slugs so each emits a static redirect file.
export function entries() {
	return products.map((p) => ({ slug: p.slug }));
}

// Teaser phase: product pages are preserved in +page.svelte but not yet public.
// Temporary (307) redirect so they can be restored later without cached 301s.
export function load() {
	throw redirect(307, '/');
}

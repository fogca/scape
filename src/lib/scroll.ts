import type Lenis from 'lenis';

// Shared handle to the app-wide Lenis instance (created in +layout.svelte) so
// individual pages can lock/unlock smooth scrolling — e.g. during the hero
// opening animation. Native overflow:hidden alone does not stop Lenis.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
	instance = l;
}

/** Lock scrolling and snap to the top. */
export function lockScroll() {
	instance?.scrollTo(0, { immediate: true });
	instance?.stop();
}

/** Re-enable scrolling. */
export function unlockScroll() {
	instance?.start();
}

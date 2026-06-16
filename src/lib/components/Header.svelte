<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Wordmark from './Wordmark.svelte';

	// Teaser build: minimal header — wordmark only, revealed after the hero.
	// Nav / cart return when the full site is implemented (see /full).
	let revealed = $state(false);

	// Routes with a full-height hero intro hide the header until the hero is
	// scrolled past. All other (content) pages show it from the start.
	const HERO_ROUTES = ['/', '/full'];
	const hasHero = $derived(HERO_ROUTES.includes(page.url.pathname));

	$effect(() => {
		if (!browser) return;
		// Content pages: header is visible immediately, no scroll listener needed.
		if (!hasHero) {
			revealed = true;
			return;
		}
		const onScroll = () => {
			revealed = window.scrollY > window.innerHeight - 80;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header class="brand" class:revealed>
	<!-- Hero pages scroll to their own top; content pages return home. -->
	<a href={hasHero ? '#top' : '/'} class="wordmark" aria-label="Scape">
		<Wordmark />
	</a>
</header>

<style>
	.brand {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: calc(var(--z-overlay) + 2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25px var(--padding) 20px;
		background: transparent;
		color: var(--c-accent);
		transform: translateY(-100%);
		transition: transform var(--duration-slow) var(--ease-out);
	}

	.brand.revealed {
		transform: translateY(0);
	}

	.wordmark {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		line-height: 0;
	}

	.wordmark :global(svg) {
		height: 30px;
		width: auto;
		display: block;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { setLenis, getLenis } from '$lib/scroll';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	// Production origin — used for canonical + absolute OG/Twitter image URLs.
	const SITE_URL = 'https://scapewhisky.pages.dev';
	const OG_IMAGE = `${SITE_URL}/OGP.png`;
	const TITLE = 'Scape Whisky — Japanese Landscape Whisky';
	const DESCRIPTION =
		'Japanese scape whisky, distilled in Miyazaki. A single-farm distillery capturing the landscape, sound and time of Japan in every bottle.';

	// Per-page SEO comes from each route's load() (page.data); fall back to
	// the site-wide defaults so every page has a single, correct set of tags.
	const pageTitle = $derived(page.data.title ?? TITLE);
	const pageDescription = $derived(page.data.description ?? DESCRIPTION);
	const canonical = $derived(`${SITE_URL}${page.url.pathname}`);

	// Teaser-phase bottom bar — shared on every page. /full has its own full
	// Footer (the future site footer), so the minimal bar is skipped there.
	const showFoot = $derived(page.url.pathname !== '/full');

	afterNavigate(() => {
		// Always land at the top on every navigation — including browser
		// back/forward, where scroll would otherwise be restored at the old
		// position and freeze there under the hero's overflow:hidden lock.
		window.scrollTo(0, 0);
		getLenis()?.scrollTo(0, { immediate: true, force: true });
	});

	onMount(() => {
		if (!browser) return;

		// Own scroll restoration globally so the browser never restores a
		// previous position on back/forward (pages must not flip this back).
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis({
			lerp: 0.1,
			smoothWheel: true,
			wheelMultiplier: 1
		});

		// Drive ScrollTrigger from Lenis (window scroll doesn't fire under Lenis).
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		// Expose the instance so pages can lock/unlock scroll (hero animation).
		setLenis(lenis);

		return () => {
			setLenis(null);
			lenis.destroy();
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="Japanese scape whisky, scape whisky, Japanese whisky, single farm whisky, Miyazaki distillery, ジャパニーズウイスキー"
	/>
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Scape Whisky" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Scape Whisky" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<meta name="theme-color" content="#fff1dc" />
</svelte:head>

<Header />

<main>
	{@render children()}

	{#if showFoot}
		<div class="teaser-foot">
			<ul class="teaser-legal">
				<li><a href="/pages/company">Company</a></li>
				<li><a href="/pages/legal">Legal</a></li>
				<li><a href="/policies/privacy-policy">Privacy</a></li>
			</ul>
			<p class="teaser-copy">© scape whisky, 2026</p>
		</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		/* Short pages still push the shared bottom bar to the viewport floor */
		min-height: 100svh;
	}

	/* ───── Shared bottom bar ───── */
	.teaser-foot {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--sp-5);
		padding: var(--sp-6) 0 var(--sp-5);
		opacity: 0.5;
	}

	.teaser-legal {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: var(--sp-5);
	}

	.teaser-legal a,
	.teaser-copy {
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 10.5px;
		letter-spacing: 0;
		color: var(--c-text);
	}

	.teaser-legal a {
		text-decoration: none;
		transition: opacity var(--duration-default) ease;
	}

	.teaser-legal a:hover {
		opacity: 0.6;
	}

	.teaser-copy {
		margin: 0;
		white-space: nowrap;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { setLenis } from '$lib/scroll';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	// Production origin — used for canonical + absolute OG/Twitter image URLs.
	const SITE_URL = 'https://scapewhisky.pages.dev';
	const OG_IMAGE = `${SITE_URL}/OGP.png`;
	const TITLE = 'Scape Whisky — Japanese Landscape Whisky';
	const DESCRIPTION =
		'Japanese scape whisky, distilled in Miyazaki. A single-farm distillery capturing the landscape, sound and time of Japan in every bottle.';

	const canonical = $derived(`${SITE_URL}${page.url.pathname}`);

	onMount(() => {
		if (!browser) return;

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
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<meta
		name="keywords"
		content="Japanese scape whisky, scape whisky, Japanese whisky, single farm whisky, Miyazaki distillery, ジャパニーズウイスキー"
	/>
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Scape Whisky" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Scape Whisky" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<meta name="theme-color" content="#fff1dc" />
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>

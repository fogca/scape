<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Wordmark from '$lib/components/Wordmark.svelte';
	import { lockScroll, unlockScroll } from '$lib/scroll';

	let wordmark: HTMLDivElement;
	let taglineTop: HTMLParagraphElement;
	let taglineBottom: HTMLParagraphElement;
	let imageFrame: HTMLDivElement;
	let panelForest: HTMLDivElement;
	let panelOrange: HTMLDivElement;

	onMount(() => {
		if (!browser) return;

		// Force scroll to top before locking — incoming nav may preserve previous scroll Y
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		window.scrollTo(0, 0);
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
		// Stop Lenis smooth-scroll and snap to top (overflow:hidden alone won't stop it)
		lockScroll();

		gsap.set([wordmark, taglineTop, taglineBottom, imageFrame], { opacity: 0 });
		gsap.set(panelOrange, { opacity: 0 });
		gsap.set(panelForest, { opacity: 1 });
		gsap.set(imageFrame, { width: '75vw', height: '75vh' });

		const tl = gsap.timeline({
			defaults: { ease: 'power2.out' },
			onComplete: () => {
				document.body.style.overflow = '';
				document.documentElement.style.overflow = '';
				unlockScroll();
				if ('scrollRestoration' in history) {
					history.scrollRestoration = 'auto';
				}
				requestAnimationFrame(() => ScrollTrigger.refresh());
			}
		});

		// Phase 1 — orange wordmark fades in (rotated 90deg in center)
		tl.to(wordmark, { opacity: 1, duration: 0.8 });

		// Phase 3 — forest-green panel fades in at 75vw/75vh; wordmark stays orange on green
		tl.to(imageFrame, { opacity: 1, duration: 1.3 }, '+=0.3');

		// Phase 4 — cross-fade green → orange; wordmark turns white at the same moment
		tl.to(panelForest, { opacity: 0, duration: 0.7 }, '+=0.6');
		tl.to(panelOrange, { opacity: 1, duration: 0.7 }, '<');
		tl.to(wordmark, { color: '#FFF1DC', duration: 0.7, ease: 'power1.inOut' }, '<');

		// Phase 6 — smoothly expand panel to 100vw/100vh
		tl.to(
			imageFrame,
			{
				width: '100vw',
				height: '100vh',
				duration: 2.0,
				ease: 'power3.inOut'
			},
			'+=0.6'
		);

		// Phase 2 (delayed) — taglines fade in AFTER the image fills the screen
		tl.to([taglineTop, taglineBottom], { opacity: 1, duration: 0.9, stagger: 0.15 }, '+=0.2');

		// ─── Fade-up on scroll for the concept block ───
		const scrollTriggers: ScrollTrigger[] = [];
		const conceptItems = gsap.utils.toArray<HTMLElement>('.concept-text > *');
		if (conceptItems.length) {
			const tween = gsap.from(conceptItems, {
				opacity: 0,
				y: 28,
				duration: 0.9,
				ease: 'power2.out',
				stagger: 0.12,
				scrollTrigger: {
					trigger: conceptItems[0],
					start: 'top 80%',
					toggleActions: 'play none none none'
				}
			});
			const st = tween.scrollTrigger;
			if (st) scrollTriggers.push(st);
		}

		return () => {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
			unlockScroll();
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'auto';
			}
			tl.kill();
			scrollTriggers.forEach((st) => st.kill());
		};
	});
</script>

<!-- ─────────────────────────────────────────────────────
     HERO — opening animation that settles into the static state
     ───────────────────────────────────────────────────── -->
<section id="top" class="hero">
	<!-- white curtain sits at the back; covered by image after expansion -->
	<div class="hero-curtain"></div>

	<div class="hero-image-frame" bind:this={imageFrame}>
		<div class="hero-panel panel-forest" bind:this={panelForest}></div>
		<div class="hero-panel panel-orange" bind:this={panelOrange}></div>
	</div>

	<p class="hero-tagline hero-tagline-top" bind:this={taglineTop}>
		Distilled in Miyazaki, Japan
	</p>

	<div class="hero-wordmark" bind:this={wordmark} aria-label="Scape">
		<Wordmark />
	</div>

	<p class="hero-tagline hero-tagline-bottom" bind:this={taglineBottom}>
		Japanese scape whisky<br />composed in harmony
	</p>
</section>

<!-- ─────────────────────────────────────────────────────
     CONCEPT — paragraph + statement
     ───────────────────────────────────────────────────── -->
<section id="concept" class="concept">
	<div class="concept-text">
		<p class="concept-body bold">
			「landscape」「soundscape」「timescape」——<br />
			なにかの気配が形になるとき、そこにはいつも「scape」という言葉がある。
		</p>
		<p class="concept-body bold">
			SCAPEは、日本の風土・音・時間・手仕事、そのすべての気配をウイスキーという形に宿す試みです。だから、大麦はすべて日本のものを。北の大地で育ったものも、南の風を受けたものも、山々に囲まれて育ったものも——それぞれの土地の気配を、静かにまとっている。
		</p>
		<p class="concept-body bold">
			土地が変われば、個性が変わる。その発見が、この一本になる。これは、日本の気配を旅すること。つくる私たちも、飲むあなたも、まだ見ぬ景色へ。
		</p>
	</div>

	<h2 class="statement" aria-label="Japanese scape whisky · Coming Soon">
		<div class="marquee" aria-hidden="true">
			<div class="marquee-track">
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming Soon&nbsp;·&nbsp;</span>
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming Soon&nbsp;·&nbsp;</span>
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming Soon&nbsp;·&nbsp;</span>
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming Soon&nbsp;·&nbsp;</span>
			</div>
		</div>
	</h2>
</section>

<!-- ─────────────────────────────────────────────────────
     BOTTOM BAR — legal links + copyright (replaces the footer)
     ───────────────────────────────────────────────────── -->
<div class="teaser-foot">
	<ul class="teaser-legal">
		<li><a href="/privacy">Privacy</a></li>
		<li><a href="/legal">Legal</a></li>
	</ul>
	<p class="teaser-copy">© scape whisky, 2026</p>
</div>

<style>
	/* ───── HERO ───── */
	.hero {
		position: relative;
		height: 100vh;
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		overflow: hidden;
		color: var(--c-white);
	}

	/* White background — sits behind everything; covered by 100vw image after expansion */
	.hero-curtain {
		position: absolute;
		inset: 0;
		background: var(--c-bg);
		z-index: 0;
	}

	/* Brand-color panel — animated from 75vw/75vh to 100vw/100vh; stacks 3 color layers */
	.hero-image-frame {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		z-index: 1;
	}

	.hero-panel {
		position: absolute;
		inset: 0;
	}

	.panel-forest {
		background: #00320b;
	}

	.panel-orange {
		background: var(--c-accent);
	}

	.hero-wordmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: var(--c-accent);
		line-height: 0;
		width: 220px;
		height: 220px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 3;
	}

	.hero-wordmark :global(svg) {
		height: 54px;
		width: auto;
		/* P descender shifts visual mass; nudge left to optically center */
		transform: translateX(-5px) rotate(90deg);
		transform-origin: center;
	}

	.hero-tagline {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 4;
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		letter-spacing: 0;
		white-space: nowrap;
		color: var(--c-white);
	}

	.hero-tagline-top {
		top: 28px;
	}

	.hero-tagline-bottom {
		bottom: 28px;
		text-align: center;
		white-space: normal;
	}

	/* ───── CONCEPT ───── */
	.concept {
		padding-top: var(--sp-12);
		padding-bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-11);
	}

	.concept-text {
		width: 80%;
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
		opacity: 0.85;
	}

	@media (min-width: 1024px) {
		.concept-text {
			width: 50%;
		}
	}

	.concept-body {
		font-family: var(--font-ja);
		font-size: 12.5px;
		line-height: 1.85;
		letter-spacing: 0;
		color: var(--c-text);
		text-align: center;
	}

	.statement {
		width: 100vw;
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		overflow: hidden;
	}

	.marquee {
		width: 100%;
		overflow: hidden;
		display: block;
	}

	.marquee-track {
		display: inline-flex;
		white-space: nowrap;
		animation: marquee-scroll 80s linear infinite;
		will-change: transform;
	}

	.marquee-item {
		display: inline-block;
		font-family: var(--font-en);
		font-weight: 900;
		font-size: 72px;
		line-height: 1.1;
		color: var(--c-accent);
		letter-spacing: 0;
		flex-shrink: 0;
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}

	/* ───── BOTTOM BAR ───── */
	.teaser-foot {
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

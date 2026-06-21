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
	let panelImage: HTMLImageElement;

	onMount(() => {
		if (!browser) return;

		// Force scroll to top before locking — incoming nav may preserve previous scroll Y.
		// (scrollRestoration is kept 'manual' globally in +layout.svelte.)
		window.scrollTo(0, 0);
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
		// Stop Lenis smooth-scroll and snap to top (overflow:hidden alone won't stop it)
		lockScroll();

		gsap.set([wordmark, taglineTop, taglineBottom, imageFrame], { opacity: 0 });
		gsap.set([panelOrange, panelImage], { opacity: 0 });
		gsap.set(panelForest, { opacity: 1 });
		gsap.set(imageFrame, { width: '75vw', height: '75vh' });

		const tl = gsap.timeline({
			defaults: { ease: 'power2.out' },
			onComplete: () => {
				document.body.style.overflow = '';
				document.documentElement.style.overflow = '';
				unlockScroll();
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

		// Phase 5 — cross-fade orange → product image; wordmark stays white
		tl.to(panelOrange, { opacity: 0, duration: 0.7 }, '+=0.6');
		tl.to(panelImage, { opacity: 1, duration: 0.7 }, '<');

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

		// ─── Fade-up for the concept block (paragraphs + CTA) ───
		// IntersectionObserver, not ScrollTrigger: ScrollTrigger raced with the
		// intro's refresh in some environments and left items stuck at opacity:0.
		// IO keys off real viewport intersection, so it can't desync — and the
		// reveal callback always runs once the block scrolls in.
		const scrollTriggers: ScrollTrigger[] = [];
		let conceptIO: IntersectionObserver | null = null;
		const conceptItems = gsap.utils.toArray<HTMLElement>('.concept-text > *');
		const conceptBlock = document.querySelector('.concept-text');
		if (conceptItems.length && conceptBlock) {
			gsap.set(conceptItems, { opacity: 0, y: 28 });
			conceptIO = new IntersectionObserver(
				(entries) => {
					if (!entries.some((e) => e.isIntersecting)) return;
					gsap.to(conceptItems, {
						// Paragraphs rest at 0.85; the CTA stays fully opaque.
						opacity: (_i, el) => ((el as HTMLElement).classList.contains('concept-cta') ? 1 : 0.85),
						y: 0,
						duration: 0.9,
						ease: 'power2.out',
						stagger: 0.12
					});
					conceptIO?.disconnect();
				},
				{ rootMargin: '0px 0px -12% 0px', threshold: 0 }
			);
			conceptIO.observe(conceptBlock);
		}

		return () => {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
			unlockScroll();
			tl.kill();
			conceptIO?.disconnect();
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
		<img
			class="hero-panel panel-image"
			src="/images/scape_product.webp"
			alt="Scape whisky bottles"
			bind:this={panelImage}
		/>
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
			「Scape（スケープ）」は、日本の風土と、音や時間、そして職人の手仕事<br />——そのすべての気配を、一本に宿すジャパニーズウイスキー。
		</p>
		<p class="concept-body bold">
			原料となる大麦はすべて日本のもの。<br />
			北の大地で育ったものも、南の風を受けたものも、山々に囲まれて育ったものも、<br />
			それぞれの土地の気配を静かにまとっている。
		</p>
		<p class="concept-body bold">
			土地が変われば、個性が変わる。その発見が、この一本になる。<br />
			これは、日本の気配を旅すること。
		</p>
		<p class="concept-body bold">
			つくる私たちも、飲むあなたも、まだ見ぬ景色へ。
		</p>

		<a class="concept-cta" href="mailto:info@scapewhisky.com">お問い合わせ</a>
	</div>

	<h2 class="statement" aria-label="Japanese scape whisky · Coming soon">
		<div class="marquee" aria-hidden="true">
			<div class="marquee-track">
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming soon&nbsp;·&nbsp;</span>
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming soon&nbsp;·&nbsp;</span>
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming soon&nbsp;·&nbsp;</span>
				<span class="marquee-item">Japanese scape whisky&nbsp;·&nbsp;Coming soon&nbsp;·&nbsp;</span>
			</div>
		</div>
	</h2>
</section>

<!-- ─────────────────────────────────────────────────────
     BOTTOM BAR — legal links + copyright (replaces the footer)
     ───────────────────────────────────────────────────── -->
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

	.panel-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.panel-image {
			/* Keep both bottles in frame on narrow screens */
			object-position: 48% 50%;
		}
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
		/* Taglines sit over the hero image — ivory */
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
		padding-top: var(--sp-9);
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
		opacity: 0.85;
	}

	/* Contact CTA — sits below the concept copy */
	.concept-cta {
		align-self: center;
		margin-top: var(--sp-2);
		margin-bottom: 40px;
		font-family: var(--font-ja);
		font-weight: 500;
		font-size: 13px;
		letter-spacing: 0;
		color: var(--c-white);
		background: var(--c-accent);
		border: none;
		border-radius: 999px;
		padding: 13px 32px;
		text-decoration: none;
		transition: opacity var(--duration-default) ease;
	}

	.concept-cta:hover {
		opacity: 0.85;
	}

	/* PC keeps the authored line breaks; SP lets the text flow naturally. */
	@media (max-width: 768px) {
		.concept-body br {
			display: none;
		}
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

</style>

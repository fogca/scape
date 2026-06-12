<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Wordmark from '$lib/components/Wordmark.svelte';
	import HeroProductCard from '$lib/components/HeroProductCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { products } from '$lib/data/products';

	const featuredProduct = products[0];

	let wordmark: HTMLDivElement;
	let taglineTop: HTMLParagraphElement;
	let taglineBottom: HTMLParagraphElement;
	let imageFrame: HTMLDivElement;
	let img1: HTMLImageElement;
	let img2: HTMLImageElement;
	let img3: HTMLImageElement;
	let productCard: HTMLDivElement;

	onMount(() => {
		if (!browser) return;

		// Force scroll to top before locking — incoming nav may preserve previous scroll Y
		window.scrollTo(0, 0);
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';

		gsap.set([wordmark, taglineTop, taglineBottom, imageFrame], { opacity: 0 });
		gsap.set([img2, img3], { opacity: 0 });
		gsap.set(img1, { opacity: 1 });
		gsap.set(imageFrame, { width: '75vw', height: '75vh' });
		gsap.set(productCard, { opacity: 0, y: 40 });

		const tl = gsap.timeline({
			defaults: { ease: 'power2.out' },
			onComplete: () => {
				document.body.style.overflow = '';
				document.documentElement.style.overflow = '';
				if ('scrollRestoration' in history) {
					history.scrollRestoration = 'auto';
				}
				// ScrollTrigger positions were calculated while scroll was locked
				// (and images may not have loaded yet). Refresh now that the page
				// is in its final state.
				requestAnimationFrame(() => ScrollTrigger.refresh());
			}
		});

		// Phase 1 — orange wordmark fades in (rotated 90deg in center)
		tl.to(wordmark, { opacity: 1, duration: 0.8 });

		// Phase 3 — image fades in at 80vw/80vh, wordmark turns white at the same moment
		tl.to(imageFrame, { opacity: 1, duration: 1.3 }, '+=0.3');
		tl.to(wordmark, { color: '#FFF1DC', duration: 0.8, ease: 'power1.inOut' }, '<');

		// Phase 4 — image cross-fade 1 → 2
		tl.to(img1, { opacity: 0, duration: 0.7 }, '+=0.6');
		tl.to(img2, { opacity: 1, duration: 0.7 }, '<');

		// Phase 5 — image cross-fade 2 → 3
		tl.to(img2, { opacity: 0, duration: 0.7 }, '+=0.6');
		tl.to(img3, { opacity: 1, duration: 0.7 }, '<');

		// Phase 6 — smoothly expand image to 100vw/100vh
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
		tl.to(
			[taglineTop, taglineBottom],
			{ opacity: 1, duration: 0.9, stagger: 0.15 },
			'+=0.2'
		);

		// Phase 7 — product card fades up from bottom
		tl.to(
			productCard,
			{ opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
			'+=0.3'
		);

		// ─── Feature sections (Product / Distillery / Landscape) ───
		// Anse-style: each section is a 220vh window (clip-path) over a fixed
		// 100vh layer. The first image grows from small to full-bleed as it
		// enters, snaps at full, then text scrubs in during the pinned dwell.
		// On exit the outgoing image inflates from the bottom edge while the
		// next section's window slides over it.
		const scrollTriggers: ScrollTrigger[] = [];
		const features = gsap.utils.toArray<HTMLElement>('.feature');
		features.forEach((section, i) => {
			const frame = section.querySelector<HTMLElement>('.feature-frame');
			const img = section.querySelector<HTMLElement>('.feature-img');
			const textItems = gsap.utils.toArray<HTMLElement>(
				section.querySelectorAll('.feature-text > *')
			);

			// First feature only — grow from small frame to full-bleed, snap at full
			if (i === 0 && frame) {
				const grow = gsap.fromTo(
					frame,
					{ width: '62vw', height: '62vh' },
					{
						width: '100vw',
						height: '100vh',
						ease: 'none',
						scrollTrigger: {
							trigger: section,
							start: 'top bottom',
							end: 'top top',
							scrub: true,
							snap: {
								snapTo: (value) => (value > 0.82 ? 1 : value),
								duration: { min: 0.2, max: 0.6 },
								ease: 'power1.inOut'
							},
							invalidateOnRefresh: true
						}
					}
				);
				if (grow.scrollTrigger) scrollTriggers.push(grow.scrollTrigger);
			}

			// Text scrubs in while the layer is pinned (the dwell height)
			if (textItems.length) {
				const textTl = gsap.timeline({
					scrollTrigger: {
						trigger: section,
						start: 'top top',
						end: () => `+=${section.offsetHeight - window.innerHeight}`,
						scrub: true,
						invalidateOnRefresh: true
					}
				});
				textTl.fromTo(
					textItems,
					{ opacity: 0, y: 24 },
					{ opacity: 1, y: 0, stagger: 0.18, duration: 0.6, ease: 'power2.out' }
				);
				// Tail dwell so the text rests fully visible before the exit
				textTl.to({}, { duration: 0.5 });
				if (textTl.scrollTrigger) scrollTriggers.push(textTl.scrollTrigger);
			}

			// Exit parallax — bottom-origin inflate while the clip pulls away
			if (img) {
				const exit = gsap.fromTo(
					img,
					{ scale: 1 },
					{
						scale: 1.18,
						ease: 'none',
						scrollTrigger: {
							trigger: section,
							start: 'bottom bottom',
							end: 'bottom top',
							scrub: true,
							invalidateOnRefresh: true
						}
					}
				);
				if (exit.scrollTrigger) scrollTriggers.push(exit.scrollTrigger);
			}
		});

		// Refresh once images have loaded so triggers use final layout heights
		const refreshOnLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', refreshOnLoad);
		document.querySelectorAll('.feature-img').forEach((img) => {
			const el = img as HTMLImageElement;
			if (!el.complete) {
				el.addEventListener('load', refreshOnLoad, { once: true });
			}
		});

		// ─── Fade-up on scroll for content blocks ───
		const fadeUpGroups: { selector: string; stagger?: number; start?: string }[] = [
			{ selector: '.concept-text > *', stagger: 0.12 },
			{ selector: '.cask-inner > *', stagger: 0.08, start: 'top 80%' },
			{ selector: '.gallery-item', stagger: 0.15 },
			{ selector: '.contact-inner > *', stagger: 0.1 }
		];

		fadeUpGroups.forEach(({ selector, stagger = 0, start = 'top 80%' }) => {
			const elements = gsap.utils.toArray<HTMLElement>(selector);
			if (!elements.length) return;
			// Group elements by their parent so stagger feels right per section
			const byParent = new Map<Element, HTMLElement[]>();
			elements.forEach((el) => {
				const parent = el.parentElement;
				if (!parent) return;
				if (!byParent.has(parent)) byParent.set(parent, []);
				byParent.get(parent)!.push(el);
			});
			byParent.forEach((items) => {
				const tween = gsap.from(items, {
					opacity: 0,
					y: 28,
					duration: 0.9,
					ease: 'power2.out',
					stagger,
					scrollTrigger: {
						trigger: items[0],
						start,
						toggleActions: 'play none none none'
					}
				});
				const st = tween.scrollTrigger;
				if (st) scrollTriggers.push(st);
			});
		});

		return () => {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'auto';
			}
			window.removeEventListener('load', refreshOnLoad);
			tl.kill();
			scrollTriggers.forEach((st) => st.kill());
		};
	});
</script>

<!-- Internal WIP page — full homepage preserved for later implementation.
     Kept out of search indexes until promoted to `/`. -->
<svelte:head>
	<title>Scape Whisky — Full (WIP)</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- ─────────────────────────────────────────────────────
     HERO — opening animation that settles into the static state
     ───────────────────────────────────────────────────── -->
<section id="top" class="hero">
	<!-- white curtain sits at the back; covered by image after expansion -->
	<div class="hero-curtain"></div>

	<div class="hero-image-frame" bind:this={imageFrame}>
		<img src="/images/story-barley.jpg" alt="" bind:this={img1} class="hero-img" />
		<img src="/images/landscape-miyazaki.jpg" alt="" bind:this={img2} class="hero-img" />
		<img src="/images/hero-bottle.jpg" alt="Scape whisky bottle in the Kirishima landscape" bind:this={img3} class="hero-img" />
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

	<div class="hero-product-slot" bind:this={productCard}>
		<HeroProductCard product={featuredProduct} />
	</div>
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

	<h2 class="statement" aria-label="we distill the landscape of Japan">
		<div class="marquee" aria-hidden="true">
			<div class="marquee-track">
				<span class="marquee-item">we distill the landscape of Japan&nbsp;·&nbsp;</span>
				<span class="marquee-item">we distill the landscape of Japan&nbsp;·&nbsp;</span>
				<span class="marquee-item">we distill the landscape of Japan&nbsp;·&nbsp;</span>
				<span class="marquee-item">we distill the landscape of Japan&nbsp;·&nbsp;</span>
			</div>
		</div>
	</h2>
</section>

<!-- ─────────────────────────────────────────────────────
     PRODUCT — bottle, full-bleed
     ───────────────────────────────────────────────────── -->
<section id="product" class="feature">
	<div class="feature-layer">
		<div class="feature-frame">
			<img class="feature-img" src="/images/bottle-gm26.jpg" alt="Scape Whisky GM26 bottle" />
			<div class="feature-veil"></div>
		</div>
		<div class="feature-text">
			<p class="eyebrow accent">Product</p>
			<h2 class="feature-title">
				A bottle that<br />
				holds the land.
			</h2>
			<p class="body white-body">
				Scapeは一樽ごとに別の物語を持っています。畑単位の大麦、樽の個性、季節の温度差——その全てが、ひと瓶のなかで重なり合い、土地そのものの輪郭を描き出します。
			</p>
			<p class="body white-body">
				リリースされる一本一本に、その背景となった農場、樽、収穫年、蒸留と瓶詰めの記録が刻まれます。同じものは二度とつくれない。だからこそ、一本がそのまま、ひとつの風景になる。
			</p>
			<p class="body white-body">
				シングルファームシリーズは、年間50樽という極めて限られた生産から、ファインダイニングおよび直販でのみご紹介しています。
			</p>
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────────────
     DISTILLERY — copper still, full-bleed
     ───────────────────────────────────────────────────── -->
<section id="distillery" class="feature">
	<div class="feature-layer">
		<div class="feature-frame">
			<img class="feature-img" src="/images/gallery-maturation.jpg" alt="Copper pot still" />
			<div class="feature-veil"></div>
		</div>
		<div class="feature-text">
			<p class="eyebrow accent">Distillery</p>
			<h2 class="feature-title">
				A small distillery,<br />
				rooted in the land.
			</h2>
		<p class="body white-body">
			宮崎県都城市。霧島山系の懐に佇む小さな蒸留所で、私たちはウイスキーをつくっています。九州南部の温暖な気候、火山性の土壌、そして山々から地下を通って湧き出る伏流水。土地そのものが、ここでしか生まれない味を育てます。
		</p>
		<p class="body white-body">
			蒸留に使うのは、銅のポットスチルが2基。仕込みから蒸留、樽詰めに至るまで、全ての工程を手仕事で行います。年間蒸留量は10,000リットル、樽にしてわずか50本。規模を追わず、ひと樽ごとの完成度を追求するスタイルです。
		</p>
			<p class="body white-body">
				大きなプラントが効率を求めるのと反対の方向に、私たちは小ささを選びました。小さいから、畑単位で蒸留できる。小さいから、樽ごとに個性を残せる。
			</p>
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────────────
     LANDSCAPE — Kirishima, full-bleed
     ───────────────────────────────────────────────────── -->
<section id="landscape" class="feature">
	<div class="feature-layer">
		<div class="feature-frame">
			<img class="feature-img" src="/images/landscape-miyazaki.jpg" alt="Kirishima mountain forest" />
			<div class="feature-veil"></div>
		</div>
		<div class="feature-text">
			<p class="eyebrow accent">Landscape</p>
			<h2 class="feature-title">
				From the forest<br />
				of Kirishima.
			</h2>
		<p class="body white-body">
			霧島連山の麓には、何百年もの時間が積み重なった森が広がっています。火山が育てた肥沃な土、苔むした岩、地中を旅する水。その全てが、Scapeの仕込み水を生み出します。
		</p>
		<p class="body white-body">
			蒸留所を取り囲むのは、宮崎の自然そのもの。空気の湿度、風の匂い、夏の蝉の声、冬の朝霧——ウイスキーは樽の中で、それらの全てを少しずつ吸い込みながら熟成していきます。
		</p>
			<p class="body white-body">
				土地に立たなければ生まれない一本がある。それを伝えることが、ScapeというブランドのRaisonとなります。
			</p>
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────────────
     CASK OWNER — deep green bg, accent text
     ───────────────────────────────────────────────────── -->
<section id="cask-owner" class="cask-section">
	<div class="cask-inner">
		<h2 class="cask-title">
			Own a cask,<br />
			own a landscape.
		</h2>
		<p class="eyebrow accent">Cask ownership</p>
		<p class="cask-body">
			蒸留したての原酒を樽に詰め、熟成のときを共に過ごす。気候と時間が、あなただけのウイスキーを育てていきます。
		</p>
		<p class="cask-body">
			完成までの数年間、樽の状態は定期的にご報告。仕上げのブレンドや瓶詰本数も、ご相談いただけます。
		</p>

		<dl class="cask-spec">
			<div class="cask-row">
				<dt>Cask size</dt>
				<dd>Bourbon / hogshead / sherry butt</dd>
			</div>
			<div class="cask-row">
				<dt>Maturation</dt>
				<dd>3 – 10 years</dd>
			</div>
			<div class="cask-row">
				<dt>Yield</dt>
				<dd>180 – 450 bottles</dd>
			</div>
		</dl>
	</div>
</section>

<!-- ─────────────────────────────────────────────────────
     GALLERY — asymmetric image grid (after Cask Owner)
     ───────────────────────────────────────────────────── -->
<section id="gallery" class="gallery">
	<figure class="gallery-item gallery-1">
		<img src="/images/story-barley.jpg" alt="Malt floor" />
		<figcaption class="body-sm">Malt floor</figcaption>
	</figure>
	<figure class="gallery-item gallery-2">
		<img src="/images/gallery-maturation.jpg" alt="Maturation" />
	</figure>
	<figure class="gallery-item gallery-3">
		<img src="/images/distillery-still.jpg" alt="Still room" />
		<figcaption class="body-sm">Still room</figcaption>
	</figure>
	<figure class="gallery-item gallery-4">
		<img src="/images/gallery-pouring.jpg" alt="Pouring" />
	</figure>
</section>

<!-- ─────────────────────────────────────────────────────
     CONTACT — orange bg
     ───────────────────────────────────────────────────── -->
<section id="contact" class="contact-section">
	<div class="contact-inner">
		<p class="eyebrow white">Contact</p>
		<h2 class="h2 white">
			Toward an<br />
			unseen landscape.
		</h2>
		<p class="body white-body">
			プロダクトのご購入・カスクオーナーシップ<br />
			取材／コラボレーションのご相談はこちらから。
		</p>
		<a href="mailto:info@scapewhisky.com" class="contact-link">info@scapewhisky.com →</a>
	</div>
</section>

<Footer />

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

	/* Image frame — animated from 80vw/80vh to 100vw/100vh; stacks 3 images */
	.hero-image-frame {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		z-index: 1;
	}

	.hero-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
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

	/* Hero product card slot */
	.hero-product-slot {
		position: absolute;
		bottom: 70px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 5;
	}

	@media (max-width: 540px) {
		.hero-product-slot {
			bottom: 60px;
		}
	}

	/* ───── CONCEPT ───── */
	.concept {
		padding-top: var(--sp-12);
		padding-bottom: var(--sp-12);
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

	/* ───── FEATURE SECTIONS (Product / Distillery / Landscape) ─────
	   Anse-style window reveal: the section is a tall clip window
	   (clip-path creates the moving viewport) over a fixed 100vh layer.
	   The extra height beyond 100vh is the pinned dwell that drives
	   the text scrub. */
	.feature {
		position: relative;
		height: 220vh;
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		clip-path: inset(0);
		color: var(--c-white);
	}

	.feature-layer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}

	/* Image frame — GSAP grows the first feature from 62vw/62vh to full */
	.feature-frame {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.feature-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* Exit parallax inflates from the bottom edge (scale set per frame) */
		transform-origin: 50% 100%;
		will-change: transform;
	}

	.feature-veil {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(40, 22, 13, 0) 40%, rgba(40, 22, 13, 0.65) 100%);
	}

	.feature-text {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: var(--sp-11) var(--padding);
		max-width: 75%;
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
		z-index: 2;
	}

	/* Scrubbed by scroll while the layer is pinned (styles set per frame) */
	.feature-text > * {
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.feature-text > * {
			opacity: 1;
		}
	}

	.feature-title {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: 20px;
		line-height: 1.3;
		letter-spacing: 0;
		color: var(--c-white);
		margin: 0 0 var(--sp-3) 0;
	}

	@media (min-width: 1024px) {
		.feature-text {
			max-width: 56%;
		}
	}

	/* ───── CASK OWNER ───── */
	.cask-section {
		background: var(--c-deep);
		color: var(--c-accent);
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		padding: var(--sp-12) var(--padding);
	}

	.cask-inner {
		max-width: var(--max-width);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--sp-6);
	}

	.cask-title {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: clamp(36px, 6vw, 72px);
		line-height: 1.1;
		color: var(--c-accent);
		letter-spacing: 0;
	}

	.cask-body {
		font-family: var(--font-ja);
		font-weight: 500;
		font-size: var(--fs-body);
		line-height: 1.7;
		color: var(--c-accent);
		max-width: 560px;
	}

	.cask-spec {
		margin-top: var(--sp-7);
		display: flex;
		flex-direction: column;
		gap: 0;
		max-width: 560px;
	}

	.cask-row {
		display: grid;
		grid-template-columns: 160px 1fr;
		padding: var(--sp-4) 0;
		border-bottom: 1px solid rgba(218, 81, 12, 0.3);
		gap: var(--sp-4);
	}

	.cask-row dt {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: var(--fs-sm);
		letter-spacing: 0;
	}

	.cask-row dd {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: var(--fs-body);
	}

	/* ───── LANDSCAPE ───── */
	.landscape-section {
		background: var(--c-accent);
		color: var(--c-white);
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		padding: var(--sp-12) var(--padding) var(--sp-11);
		display: flex;
		flex-direction: column;
		gap: var(--sp-10);
	}

	.landscape-head {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
		max-width: 720px;
	}

	.landscape-head .eyebrow,
	.landscape-head .h2,
	.landscape-head .body {
		color: var(--c-white);
	}

	.landscape-card {
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
	}

	.landscape-card img {
		width: 100%;
		height: clamp(320px, 60vh, 540px);
		object-fit: cover;
	}

	.landscape-card-text {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		max-width: 560px;
	}

	.landscape-card .eyebrow.accent {
		color: var(--c-white);
		opacity: 0.6;
	}

	/* ───── GALLERY ───── */
	.gallery {
		padding: var(--sp-12) 0;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: var(--sp-6);
		align-items: start;
	}

	.gallery-item {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
	}

	.gallery-item img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	.gallery-1 {
		grid-column: 3 / 9;
	}

	.gallery-2 {
		grid-column: 8 / 12;
		margin-top: var(--sp-10);
	}

	.gallery-3 {
		grid-column: 1 / 5;
		margin-top: var(--sp-7);
	}

	.gallery-4 {
		grid-column: 5 / 11;
		margin-top: var(--sp-5);
	}

	/* ───── CONTACT ───── */
	.contact-section {
		background: var(--c-accent);
		color: var(--c-white);
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		padding: var(--sp-12) var(--padding);
	}

	.contact-inner {
		max-width: var(--max-width);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
		align-items: flex-start;
	}

	/* Pin text to cream explicitly — global helpers must not leak orange here */
	.contact-inner :global(.eyebrow),
	.contact-inner :global(.h2),
	.contact-inner :global(.body) {
		color: var(--c-white);
	}

	.contact-link {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: clamp(18px, 2vw, 24px);
		color: var(--c-white);
		text-decoration: underline;
		text-underline-offset: 6px;
		margin-top: var(--sp-5);
		transition: opacity var(--duration-default) ease;
	}

	.contact-link:hover {
		opacity: 0.7;
	}

	.white-body {
		color: rgba(255, 241, 220, 0.92);
	}

	/* ───── Responsive ───── */
	@media (max-width: 768px) {
		.hero-bottom {
			max-width: 100%;
		}

		.hero-scroll {
			bottom: 35%;
		}

		.cask-row {
			grid-template-columns: 130px 1fr;
		}

		.landscape-card img {
			height: 60vw;
		}

		.gallery {
			grid-template-columns: repeat(6, 1fr);
			gap: var(--sp-5);
		}

		.gallery-1 {
			grid-column: 2 / 6;
		}
		.gallery-2 {
			grid-column: 3 / 7;
			margin-top: var(--sp-6);
		}
		.gallery-3 {
			grid-column: 1 / 4;
			margin-top: var(--sp-5);
		}
		.gallery-4 {
			grid-column: 1 / 6;
			margin-top: var(--sp-4);
		}
	}
</style>

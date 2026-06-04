<script lang="ts">
	// About page — Concept / Story / Distillery / Whisky / Company
</script>

<svelte:head>
	<title>About — Scape Whisky</title>
	<meta
		name="description"
		content="Scape — a single-farm Japanese whisky distillery in Miyazaki. Three Scapes: Landscape, Soundscape, Timescape."
	/>
</svelte:head>

<article class="about">
	<!-- ─── Hero ─── -->
	<section class="hero">
		<img src="/images/landscape-miyazaki.jpg" alt="" class="hero-bg" />
		<div class="hero-inner">
			<p class="hero-eyebrow">About</p>
			<h1 class="hero-title">
				Three scapes,<br />
				one bottle.
			</h1>
			<p class="hero-lead">
				日本各地のテロワールを一本に閉じ込める、宮崎の小さな蒸留所。
			</p>
		</div>
	</section>

	<!-- ─── Concept ─── -->
	<section class="section concept">
		<header class="section-head">
			<p class="eyebrow">01 / Concept</p>
			<h2 class="h2">Three Scapes.</h2>
		</header>

		<div class="concept-grid">
			<article class="concept-card">
				<p class="concept-num">L</p>
				<h3 class="h3">Landscape</h3>
				<p class="body">
					霧島山系に抱かれた宮崎の蒸留所、そして日本各地の契約農場。土地の輪郭が一本のボトルに集約される。
				</p>
			</article>
			<article class="concept-card">
				<p class="concept-num">S</p>
				<h3 class="h3">Soundscape</h3>
				<p class="body">
					風が大麦畑を渡る音、蒸留器の鼓動、樽倉庫の静寂。土地の気配を蒸留に閉じ込める。
				</p>
			</article>
			<article class="concept-card">
				<p class="concept-num">T</p>
				<h3 class="h3">Timescape</h3>
				<p class="body">
					樽の中で過ぎていく季節と年月。一定ではないリズムで深まっていく時間そのものが、Scapeの味わいを形作る。
				</p>
			</article>
		</div>
	</section>

	<!-- ─── Story ─── -->
	<section class="media-section">
		<img class="media-bg" src="/images/story-barley.jpg" alt="" />
		<div class="media-overlay"></div>
		<div class="media-content">
			<p class="eyebrow accent">02 / Story</p>
			<h2 class="h2 white">The place that<br />shapes the spirit.</h2>
			<p class="body white-body">
				土地と人と時間が織り成すものに、私たちは長く惹かれてきました。ウイスキーをつくるとは、その土地の気配をひと瓶に閉じ込めること。SCAPEは、その小さな試みです。
			</p>
			<p class="body white-body">
				国産だから良い、というのではなく、その畑、その人、その季節だから生まれる味を信じています。北の冷涼な大地から南の暖かな風まで、それぞれの土地が持つ気配を、一本のボトルに残したい。
			</p>
		</div>
	</section>

	<!-- ─── Distillery ─── -->
	<section class="section">
		<div class="two-col">
			<div class="col-image">
				<img src="/images/distillery-still.jpg" alt="Copper pot still at the Miyazaki distillery" />
			</div>
			<div class="col-text">
				<p class="eyebrow">03 / Distillery</p>
				<h2 class="h2">In Miyazaki,<br />by hand.</h2>
				<p class="body">
					宮崎県都城市、霧島連山の懐に佇む蒸留所。九州南部の温暖な気候と、霧島山系から湧き出る伏流水が、ここでしか生まれないウイスキーを育てます。
				</p>
				<p class="body">
					年間蒸留量は10,000リットル、樽にして50本。小さな釜で、ひとつずつ。仕込みから樽詰めまですべて手仕事で行います。
				</p>

				<dl class="spec-list">
					<div class="spec-row">
						<dt>Location</dt>
						<dd>Miyakonojo, Miyazaki, Japan</dd>
					</div>
					<div class="spec-row">
						<dt>Annual output</dt>
						<dd>10,000 L / 50 casks</dd>
					</div>
					<div class="spec-row">
						<dt>Stills</dt>
						<dd>Hand-operated copper pot stills</dd>
					</div>
					<div class="spec-row">
						<dt>Water</dt>
						<dd>Kirishima underground spring water</dd>
					</div>
				</dl>
			</div>
		</div>
	</section>

	<!-- ─── Whisky / Single Farm ─── -->
	<section class="section bg-deep-section">
		<header class="section-head">
			<p class="eyebrow white">04 / Whisky</p>
			<h2 class="h2 white">Single farm, across Japan.</h2>
		</header>

		<div class="two-col">
			<p class="body white-body">
				日本各地の大麦農家とパートナーシップを結び、畑単位で麦を蒸留する。「国産」を超えて、その土地、その人、その畑を一本のウイスキーに刻む——それがScapeの考えるテロワールです。
			</p>
			<p class="body white-body">
				畑が変われば、土壌が変わり、風が変わり、麦の表情が変わる。同じ品種でも、北海道の冷涼な大地で育った麦と、群馬の山々に守られた麦は、まるで違う表情を見せます。その違いを消すのではなく、ひとつずつ別の蒸留として残していく。それが私たちの仕事です。
			</p>
		</div>
	</section>

	<!-- ─── Company info / 会社概要 ─── -->
	<section class="section company">
		<header class="section-head">
			<p class="eyebrow">05 / Company</p>
			<h2 class="h2">会社概要</h2>
		</header>

		<dl class="company-list">
			<div class="company-row">
				<dt>商号</dt>
				<dd>Scape Distillery Co., Ltd.</dd>
			</div>
			<div class="company-row">
				<dt>代表</dt>
				<dd>—</dd>
			</div>
			<div class="company-row">
				<dt>設立</dt>
				<dd>2026年</dd>
			</div>
			<div class="company-row">
				<dt>所在地</dt>
				<dd>宮崎県都城市XXX-XX　〒100-0000</dd>
			</div>
			<div class="company-row">
				<dt>事業内容</dt>
				<dd>ウイスキー・スピリッツの製造および販売</dd>
			</div>
			<div class="company-row">
				<dt>免許</dt>
				<dd>酒類製造業免許 / 通信販売酒類小売業免許</dd>
			</div>
			<div class="company-row">
				<dt>E-mail</dt>
				<dd><a href="mailto:info@scapewhisky.com" class="inline-link">info@scapewhisky.com</a></dd>
			</div>
			<div class="company-row">
				<dt>Tel</dt>
				<dd>+81-986-XX-XXXX</dd>
			</div>
		</dl>
	</section>
</article>

<style>
	.about {
		display: flex;
		flex-direction: column;
	}

	/* ─── HERO ─── */
	.hero {
		position: relative;
		height: 70vh;
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		overflow: hidden;
		color: var(--c-white);
		display: flex;
		align-items: flex-end;
		padding: var(--padding) var(--padding) var(--sp-10);
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
		max-width: 720px;
	}

	.hero-eyebrow {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: rgba(255, 241, 220, 0.75);
		margin: 0;
	}

	.hero-title {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: clamp(48px, 7vw, 96px);
		line-height: 1.05;
		letter-spacing: 0;
		color: var(--c-white);
		margin: 0;
	}

	.hero-lead {
		font-family: var(--font-ja);
		font-weight: 400;
		font-size: 12.5px;
		line-height: 1.7;
		color: rgba(255, 241, 220, 0.9);
		margin: 0;
	}

	/* ─── SECTION COMMONS ─── */
	.section {
		padding: var(--sp-12) 0;
	}

	.section-head {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		margin-bottom: var(--sp-10);
		max-width: 720px;
	}

	/* ─── Concept ─── */
	.concept-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-9);
	}

	@media (min-width: 768px) {
		.concept-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.concept-card {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
	}

	.concept-num {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: 56px;
		line-height: 1;
		color: var(--c-accent);
		margin: 0 0 var(--sp-3) 0;
	}

	/* ─── Media section (Story) ─── */
	.media-section {
		position: relative;
		min-height: 80vh;
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		padding: var(--sp-11) var(--padding);
		display: flex;
		align-items: flex-end;
		color: var(--c-white);
		overflow: hidden;
	}

	.media-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	.media-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(74, 38, 19, 0.15) 0%, rgba(74, 38, 19, 0.7) 100%);
		z-index: 1;
	}

	.media-content {
		position: relative;
		z-index: 2;
		max-width: 620px;
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	/* ─── Two-col ─── */
	.two-col {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-10);
		align-items: start;
	}

	@media (min-width: 768px) {
		.two-col {
			grid-template-columns: 1fr 1fr;
			gap: var(--sp-11);
		}
	}

	.col-image img {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}

	.col-text {
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
	}

	/* ─── Deep section ─── */
	.bg-deep-section {
		background: var(--c-deep);
		color: var(--c-white);
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		padding: var(--sp-12) var(--padding);
	}

	.white {
		color: var(--c-white);
	}

	.white-body {
		color: rgba(255, 241, 220, 0.92);
	}

	/* ─── Spec list ─── */
	.spec-list {
		display: flex;
		flex-direction: column;
		margin: var(--sp-5) 0 0 0;
	}

	.spec-row {
		display: grid;
		grid-template-columns: 160px 1fr;
		padding: var(--sp-3) 0;
		gap: var(--sp-4);
		border-bottom: 1px solid var(--c-line);
	}

	.spec-row dt {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: var(--c-mute);
		margin: 0;
	}

	.spec-row dd {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 13px;
		color: var(--c-text);
		margin: 0;
	}

	/* ─── Company list ─── */
	.company-list {
		display: flex;
		flex-direction: column;
		max-width: 720px;
	}

	.company-row {
		display: grid;
		grid-template-columns: 140px 1fr;
		padding: var(--sp-4) 0;
		gap: var(--sp-4);
		border-bottom: 1px solid var(--c-line);
	}

	.company-row dt {
		font-family: var(--font-ja);
		font-weight: 700;
		font-size: 12px;
		color: var(--c-text);
		margin: 0;
	}

	.company-row dd {
		font-family: var(--font-ja);
		font-weight: 400;
		font-size: 12.5px;
		line-height: 1.6;
		color: var(--c-text);
		margin: 0;
	}

	@media (max-width: 540px) {
		.hero {
			height: 60vh;
		}

		.spec-row,
		.company-row {
			grid-template-columns: 110px 1fr;
		}
	}
</style>

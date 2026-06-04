<script lang="ts">
	// Cask Owner Program page
</script>

<svelte:head>
	<title>Cask Ownership — Scape Whisky</title>
	<meta
		name="description"
		content="Own a cask of Scape whisky. Choose your barley, your cask, and watch your single-farm whisky mature in Miyazaki."
	/>
</svelte:head>

<article class="cask">
	<!-- ─── Hero ─── -->
	<section class="hero">
		<img src="/images/gallery-maturation.jpg" alt="" class="hero-bg" />
		<div class="hero-inner">
			<p class="hero-eyebrow">Cask ownership program</p>
			<h1 class="hero-title">
				Own a cask,<br />
				own a landscape.
			</h1>
			<p class="hero-lead">
				あなただけの一樽を、宮崎で育てる。<br />
				土地の気配が、時間とともに深まっていく。
			</p>
		</div>
	</section>

	<!-- ─── Intro ─── -->
	<section class="section intro">
		<div class="intro-grid">
			<header class="section-head">
				<p class="eyebrow">01 / What it is</p>
				<h2 class="h2">A single cask,<br />held in your name.</h2>
			</header>
			<div class="intro-text">
				<p class="body">
					Scapeのカスクオーナーシップは、蒸留したての原酒を一樽単位でお預かりし、宮崎の蔵で熟成させていく取り組みです。畑単位で蒸留する私たちの哲学を、樽単位で所有していただく。
				</p>
				<p class="body">
					麦の選定から樽の種類、熟成期間、瓶詰めの仕様まで、オーナーと相談しながら決めていきます。完成までの数年間、樽の状態は定期的にレポートし、ご希望に応じて蔵での試飲もご案内します。
				</p>
				<p class="body">
					年間蒸留量10,000リットル、50樽という限られた生産の中から、毎年わずかな数のカスクをオーナー向けにご用意します。
				</p>
			</div>
		</div>
	</section>

	<!-- ─── The Journey ─── -->
	<section class="section bg-deep-section">
		<header class="section-head white-head">
			<p class="eyebrow white">02 / The journey</p>
			<h2 class="h2 white">From barley<br />to bottle.</h2>
		</header>

		<ol class="journey">
			<li class="journey-step">
				<p class="journey-num">01</p>
				<h3 class="journey-title">Select your barley</h3>
				<p class="journey-body white-body">
					契約農家のリストから、産地・農場・大麦品種を選択。北の冷涼な大地から南の温暖な土壌まで、産地ごとに異なる表情があります。
				</p>
			</li>
			<li class="journey-step">
				<p class="journey-num">02</p>
				<h3 class="journey-title">Choose your cask</h3>
				<p class="journey-body white-body">
					バーボン樽（180L）、ホグスヘッド（250L）、シェリーバット（500L）から、目指す味わいに合わせて樽を選びます。
				</p>
			</li>
			<li class="journey-step">
				<p class="journey-num">03</p>
				<h3 class="journey-title">Distill & cask</h3>
				<p class="journey-body white-body">
					宮崎の蒸留所で、選ばれた大麦を蒸留。樽詰めの瞬間に、樽番号とオーナー名が記録されます。
				</p>
			</li>
			<li class="journey-step">
				<p class="journey-num">04</p>
				<h3 class="journey-title">Mature & report</h3>
				<p class="journey-body white-body">
					3〜10年の熟成期間、樽の状態を定期レポート。蔵見学・試飲も随時ご案内します。
				</p>
			</li>
			<li class="journey-step">
				<p class="journey-num">05</p>
				<h3 class="journey-title">Bottle & deliver</h3>
				<p class="journey-body white-body">
					熟成が整った時点で、ラベル・瓶詰本数・ボトリング仕様をご相談しながら決定。仕上がった一樽分のウイスキーをお届けします。
				</p>
			</li>
		</ol>
	</section>

	<!-- ─── Cask options ─── -->
	<section class="section options">
		<header class="section-head">
			<p class="eyebrow">03 / Cask options</p>
			<h2 class="h2">Three sizes.</h2>
		</header>

		<div class="options-grid">
			<article class="option-card">
				<p class="option-name">Bourbon</p>
				<p class="option-volume">180 L</p>
				<dl class="option-list">
					<div>
						<dt>Yield</dt>
						<dd>180–220 bottles</dd>
					</div>
					<div>
						<dt>Maturation</dt>
						<dd>3–8 years</dd>
					</div>
					<div>
						<dt>Character</dt>
						<dd>Vanilla, soft oak, gentle sweetness</dd>
					</div>
				</dl>
			</article>

			<article class="option-card">
				<p class="option-name">Hogshead</p>
				<p class="option-volume">250 L</p>
				<dl class="option-list">
					<div>
						<dt>Yield</dt>
						<dd>260–320 bottles</dd>
					</div>
					<div>
						<dt>Maturation</dt>
						<dd>4–10 years</dd>
					</div>
					<div>
						<dt>Character</dt>
						<dd>Balanced oak, dried fruit, layered</dd>
					</div>
				</dl>
			</article>

			<article class="option-card">
				<p class="option-name">Sherry Butt</p>
				<p class="option-volume">500 L</p>
				<dl class="option-list">
					<div>
						<dt>Yield</dt>
						<dd>400–450 bottles</dd>
					</div>
					<div>
						<dt>Maturation</dt>
						<dd>5–10 years</dd>
					</div>
					<div>
						<dt>Character</dt>
						<dd>Rich, dark fruit, sherry depth</dd>
					</div>
				</dl>
			</article>
		</div>
	</section>

	<!-- ─── Pricing / Inquiry ─── -->
	<section class="section inquiry">
		<div class="inquiry-grid">
			<header class="section-head">
				<p class="eyebrow">04 / Pricing & inquiry</p>
				<h2 class="h2">Reach out.</h2>
			</header>
			<div class="inquiry-text">
				<p class="body">
					カスクオーナーのお申し込み、価格・在庫状況のご相談は個別にご案内しております。樽の種類、農場の選定、熟成期間によって価格が変動するため、まずはご希望をお聞かせください。
				</p>
				<p class="body">
					ご相談から成約まで、Scapeのチームが直接対応いたします。ご希望に応じて宮崎の蒸留所での個別ご案内も可能です。
				</p>

				<a href="mailto:cask@scapewhisky.com?subject=Cask Ownership Inquiry" class="inquiry-link">
					cask@scapewhisky.com →
				</a>
			</div>
		</div>
	</section>
</article>

<style>
	.cask {
		display: flex;
		flex-direction: column;
	}

	/* ─── Hero ─── */
	.hero {
		position: relative;
		height: 75vh;
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

	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(74, 38, 19, 0) 0%, rgba(74, 38, 19, 0.6) 100%);
		z-index: 1;
	}

	.hero-inner {
		position: relative;
		z-index: 2;
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

	/* ─── Sections ─── */
	.section {
		padding: var(--sp-12) 0;
	}

	.section-head {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		max-width: 720px;
	}

	/* Intro */
	.intro-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-9);
	}

	@media (min-width: 768px) {
		.intro-grid {
			grid-template-columns: 1fr 1.4fr;
			gap: var(--sp-11);
			align-items: start;
		}
	}

	.intro-text {
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
	}

	/* Deep section */
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
		color: rgba(255, 241, 220, 0.85);
	}

	.white-head {
		margin-bottom: var(--sp-10);
	}

	/* Journey */
	.journey {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-7);
		counter-reset: step;
	}

	@media (min-width: 768px) {
		.journey {
			grid-template-columns: repeat(5, 1fr);
			gap: var(--sp-5);
		}
	}

	.journey-step {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		padding-top: var(--sp-5);
		border-top: 1px solid rgba(255, 241, 220, 0.2);
	}

	.journey-num {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: rgba(255, 241, 220, 0.55);
		margin: 0;
	}

	.journey-title {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 17px;
		color: var(--c-white);
		margin: 0;
		letter-spacing: 0;
	}

	.journey-body {
		font-family: var(--font-ja);
		font-weight: 400;
		font-size: 11.5px;
		line-height: 1.7;
		margin: 0;
	}

	/* Options */
	.options-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-5);
		margin-top: var(--sp-10);
	}

	@media (min-width: 768px) {
		.options-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.option-card {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		padding: var(--sp-7);
		border: 1px solid var(--c-line);
	}

	.option-name {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: 28px;
		color: var(--c-text);
		margin: 0;
		letter-spacing: 0;
	}

	.option-volume {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 13px;
		color: var(--c-accent);
		margin: 0 0 var(--sp-3) 0;
	}

	.option-list {
		display: flex;
		flex-direction: column;
		margin: 0;
	}

	.option-list > div {
		display: grid;
		grid-template-columns: 100px 1fr;
		padding: var(--sp-3) 0;
		gap: var(--sp-3);
		border-top: 1px solid var(--c-line);
	}

	.option-list dt {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: var(--c-mute);
		margin: 0;
	}

	.option-list dd {
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 12px;
		color: var(--c-text);
		margin: 0;
	}

	/* Inquiry */
	.inquiry-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-9);
	}

	@media (min-width: 768px) {
		.inquiry-grid {
			grid-template-columns: 1fr 1.4fr;
			gap: var(--sp-11);
			align-items: start;
		}
	}

	.inquiry-text {
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
	}

	.inquiry-link {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: clamp(18px, 2vw, 24px);
		color: var(--c-text);
		text-decoration: underline;
		text-underline-offset: 6px;
		margin-top: var(--sp-5);
		transition: color var(--duration-default) ease;
		align-self: flex-start;
	}

	.inquiry-link:hover {
		color: var(--c-accent);
	}

	@media (max-width: 540px) {
		.hero {
			height: 60vh;
		}
	}
</style>

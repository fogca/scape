<script lang="ts">
	import HeroProductCard from '$lib/components/HeroProductCard.svelte';

	let { data } = $props();
	const product = $derived(data.product);
	const related = $derived(data.related);

	const yen = (n: number) => new Intl.NumberFormat('ja-JP').format(n);
</script>

<svelte:head>
	<title>{product.name} — Scape Whisky</title>
	<meta name="description" content={product.description} />
</svelte:head>

<article class="product">
	<!-- Full-bleed product image at top -->
	<div class="product-hero">
		<img src={product.image} alt={product.name} />
	</div>

	<!-- Info section -->
	<div class="product-info">
		<p class="info-eyebrow">{product.category}</p>
		<h1 class="info-name">{product.name}</h1>
		<p class="info-name-ja">{product.regionJa}</p>

		<p class="info-price">¥{yen(product.price)} <span class="info-tax">tax incl.</span></p>

		<!-- 2 CTA buttons right under price -->
		<div class="info-cta">
			<button type="button" class="btn-cart">
				<span>Add to cart</span>
			</button>

			<button type="button" class="btn-buy">
				<span>Buy it now</span>
				<span class="arrow">→</span>
			</button>
		</div>

		<div class="info-divider"></div>

		<p class="info-description">{product.description}</p>
		<p class="info-description-ja">{product.descriptionJa}</p>

		<div class="info-divider"></div>

		<p class="info-section-heading">Specifications</p>
		<dl class="info-specs">
			<div class="spec-row">
				<dt>Distillery</dt>
				<dd>Miyazaki, Japan</dd>
			</div>
			<div class="spec-row">
				<dt>Region</dt>
				<dd>{product.region}</dd>
			</div>
			<div class="spec-row">
				<dt>Farm</dt>
				<dd>{product.farm}</dd>
			</div>
			<div class="spec-row">
				<dt>Barley</dt>
				<dd>{product.barley}</dd>
			</div>
			<div class="spec-row">
				<dt>Cask</dt>
				<dd>{product.cask}</dd>
			</div>
			<div class="spec-row">
				<dt>Maturation</dt>
				<dd>{product.maturation}</dd>
			</div>
			<div class="spec-row">
				<dt>ABV</dt>
				<dd>{product.abv}</dd>
			</div>
			<div class="spec-row">
				<dt>Volume</dt>
				<dd>{product.volume}</dd>
			</div>
			<div class="spec-row">
				<dt>Bottle</dt>
				<dd>{product.bottleNo}</dd>
			</div>
		</dl>

		<p class="info-fineprint">
			◦ Free shipping on orders over ¥30,000　◦ Limited release: {product.totalBottles} bottles
		</p>
	</div>

	<!-- Tasting notes -->
	<section class="tasting">
		<p class="tasting-eyebrow">Tasting Notes</p>
		<div class="tasting-grid">
			<div class="tasting-item">
				<p class="tasting-label">Nose</p>
				<p class="tasting-body">{product.tastingNotes.nose}</p>
			</div>
			<div class="tasting-item">
				<p class="tasting-label">Palate</p>
				<p class="tasting-body">{product.tastingNotes.palate}</p>
			</div>
			<div class="tasting-item">
				<p class="tasting-label">Finish</p>
				<p class="tasting-body">{product.tastingNotes.finish}</p>
			</div>
		</div>
	</section>

	<!-- Related products -->
	{#if related.length > 0}
		<section class="related">
			<p class="related-eyebrow">You may also like</p>
			<div class="related-grid">
				{#each related as item (item.slug)}
					<HeroProductCard product={item} />
				{/each}
			</div>
		</section>
	{/if}
</article>

<style>
	.product {
		padding-bottom: var(--sp-12);
	}

	/* Full-bleed hero image — top 0, 100vw */
	.product-hero {
		width: 100vw;
		margin-left: calc(var(--padding) * -1);
		margin-right: calc(var(--padding) * -1);
		margin-top: 0;
		height: 80vh;
		overflow: hidden;
	}

	.product-hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Info section — centered */
	.product-info {
		max-width: 720px;
		margin: 0 auto;
		padding-top: 60px;
	}

	.info-eyebrow {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: var(--c-mute);
		margin: 0 0 var(--sp-3) 0;
	}

	.info-name {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: clamp(36px, 5vw, 56px);
		line-height: 1.1;
		margin: 0;
		letter-spacing: 0;
	}

	.info-name-ja {
		font-family: var(--font-ja);
		font-weight: 400;
		font-size: 13px;
		color: var(--c-mute);
		margin: var(--sp-3) 0 0 0;
	}

	.info-price {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 22px;
		margin: var(--sp-6) 0 var(--sp-5) 0;
		display: flex;
		align-items: baseline;
		gap: var(--sp-3);
	}

	.info-tax {
		font-size: 11px;
		color: var(--c-mute);
	}

	/* CTA — 2 buttons under price */
	.info-cta {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		margin-bottom: var(--sp-4);
	}

	.btn-cart,
	.btn-buy {
		appearance: none;
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 13px;
		padding: 18px 32px;
		cursor: pointer;
		border: 1px solid var(--c-text);
		transition: background var(--duration-default) ease, color var(--duration-default) ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--sp-4);
		letter-spacing: 0;
		width: 100%;
	}

	.btn-cart {
		background: var(--c-text);
		color: var(--c-white);
	}

	.btn-cart:hover {
		background: var(--c-accent);
		border-color: var(--c-accent);
	}

	.btn-buy {
		background: transparent;
		color: var(--c-text);
	}

	.btn-buy:hover {
		background: var(--c-text);
		color: var(--c-white);
	}

	.btn-buy .arrow {
		transition: transform var(--duration-default) ease;
	}

	.btn-buy:hover .arrow {
		transform: translateX(4px);
	}

	.info-divider {
		height: 1px;
		background: var(--c-line);
		margin: var(--sp-7) 0;
	}

	.info-description {
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 13px;
		line-height: 1.7;
		color: var(--c-text);
		margin: 0 0 var(--sp-4) 0;
	}

	.info-description-ja {
		font-family: var(--font-ja);
		font-weight: 400;
		font-size: 12px;
		line-height: 1.8;
		color: var(--c-mute);
		margin: 0;
	}

	.info-section-heading {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: var(--c-mute);
		margin: 0 0 var(--sp-4) 0;
	}

	/* Specs */
	.info-specs {
		display: flex;
		flex-direction: column;
		margin: 0;
	}

	.spec-row {
		display: grid;
		grid-template-columns: 140px 1fr;
		padding: var(--sp-3) 0;
		gap: var(--sp-4);
		border-bottom: 1px solid var(--c-line);
	}

	.spec-row:last-child {
		border-bottom: none;
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

	.info-fineprint {
		margin-top: var(--sp-7);
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 11px;
		color: var(--c-mute);
	}

	/* Tasting Notes */
	.tasting {
		max-width: 720px;
		margin: 0 auto;
		padding: var(--sp-11) 0;
		border-top: 1px solid var(--c-line);
		margin-top: var(--sp-11);
	}

	.tasting-eyebrow {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: var(--c-mute);
		margin: 0 0 var(--sp-7) 0;
	}

	.tasting-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-7);
	}

	@media (min-width: 768px) {
		.tasting-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.tasting-item {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
	}

	.tasting-label {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: 18px;
		color: var(--c-accent);
		margin: 0;
	}

	.tasting-body {
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 13px;
		line-height: 1.7;
		color: var(--c-text);
		margin: 0;
	}

	/* Related */
	.related {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--sp-11) 0;
		border-top: 1px solid var(--c-line);
	}

	.related-eyebrow {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		color: var(--c-mute);
		margin: 0 0 var(--sp-7) 0;
	}

	.related-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-5);
	}

	@media (max-width: 540px) {
		.product-hero {
			height: 60vh;
		}

		.spec-row {
			grid-template-columns: 110px 1fr;
		}

		.btn-cart,
		.btn-buy {
			padding: 16px 24px;
		}
	}
</style>

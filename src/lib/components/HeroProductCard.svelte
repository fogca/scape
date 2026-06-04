<script lang="ts">
	import type { Product } from '$lib/data/products';

	type Props = { product: Product };
	let { product }: Props = $props();

	const yen = new Intl.NumberFormat('ja-JP').format(product.price);
</script>

<a
	class="card"
	href="/products/{product.slug}"
	aria-label="{product.nameJa}  ¥{yen}  {product.volume} の詳細を表示"
	title={product.nameJa}
>
	<div class="card-image">
		<img src={product.image} alt="" loading="lazy" />
	</div>
	<div class="card-info">
		<p class="card-eyebrow">{product.category}</p>
		<h4 class="card-name">{product.name}</h4>
		<p class="card-price">¥{yen}</p>
	</div>
</a>

<style>
	.card {
		display: inline-flex;
		flex-direction: row;
		align-items: stretch;
		background: var(--c-white);
		color: var(--c-text);
		text-decoration: none;
		overflow: hidden;
		border-radius: 4px;
		min-width: 280px;
		max-width: none;
		width: calc(100vw - var(--padding) * 3);
		transition: transform var(--duration-default) var(--ease-out);
	}

	.card:hover {
		transform: translateY(-2px);
	}

	.card-image {
		position: relative;
		flex-shrink: 0;
		width: 110px;
		background-color: rgba(74, 38, 19, 0.04);
		overflow: hidden;
	}

	.card-image img {
		display: block;
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		object-position: center;
	}

	.card-info {
		padding: 15px 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 100%;
		min-height: 110px;
	}

	.card-eyebrow {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 9px;
		letter-spacing: 0.5px;
		line-height: 1;
		color: var(--c-mute);
		text-transform: uppercase;
		margin: 0;
	}

	.card-name {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.3;
		color: var(--c-text);
		margin: 0;
	}

	.card-price {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 11px;
		line-height: 1;
		color: var(--c-text);
		margin: 0;
	}

	.card-size {
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 10px;
		line-height: 1;
		color: var(--c-mute);
		margin: 0;
	}

	@media (min-width: 768px) {
		.card-image {
			width: 140px;
		}

		.card-info {
			min-height: 140px;
		}

		.card-name {
			font-size: 16px;
		}

		.card-price {
			font-size: 12px;
		}
	}
</style>

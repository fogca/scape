<script lang="ts">
	// Company Profile — 会社概要
	const rows: { label: string; value: string }[] = [
		{ label: '会社名', value: '株式会社都城クラフト蒸留所' },
		{ label: '代表取締役', value: '上村 一' },
		{ label: '所在地', value: '〒889-4602 宮崎県都城市山田町中霧島2453' },
		{ label: '設立年月日', value: '2025年11月21日' },
		{
			label: '事業内容',
			value: 'ウイスキーの製造・販売、関連商品の企画・販売'
		}
	];
</script>

<article class="legalpage">
	<header class="legalpage-head">
		<p class="eyebrow">Company</p>
		<h1 class="legalpage-title">Company<br />Profile</h1>
	</header>

	<dl class="legal-spec">
		{#each rows as row (row.label)}
			<div class="legal-row">
				<dt>{row.label}</dt>
				<dd>{row.value}</dd>
			</div>
		{/each}
	</dl>
</article>

<style>
	.legalpage {
		max-width: 720px;
		margin: 0 auto;
		padding-top: 120px;
		padding-bottom: var(--sp-5);
	}

	.legalpage-head {
		margin-bottom: var(--sp-9);
	}

	.eyebrow {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: var(--fs-sm);
		letter-spacing: 0;
		color: var(--c-accent);
		margin: 0 0 var(--sp-4);
	}

	.legalpage-title {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: 48px;
		line-height: 1.05;
		letter-spacing: 0;
		text-transform: lowercase;
		color: var(--c-text);
		margin: 0 0 var(--sp-6);
	}

	.legal-spec {
		margin: 0 0 var(--sp-8);
	}

	.legal-row {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: var(--sp-5);
		padding: var(--sp-6) 0 var(--sp-5);
		border-bottom: 1px solid var(--c-line);
	}

	.legal-row:first-child {
		border-top: 1px solid var(--c-line);
	}

	.legal-row dt {
		font-family: var(--font-ja);
		font-weight: 800;
		font-size: 13px;
		line-height: 1.7;
		color: var(--c-text);
	}

	.legal-row dd {
		font-family: var(--font-ja);
		font-weight: 500;
		font-size: 15px;
		line-height: 1.85;
		color: var(--c-text);
		margin: 0;
	}

	@media (max-width: 540px) {
		.legalpage {
			margin-inline: 0;
		}

		.legal-row {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.legal-row dt {
			font-size: 12px;
			font-weight: 800;
		}

		.legal-row dd {
			font-size: 14px;
			font-weight: 500;
		}
	}
</style>

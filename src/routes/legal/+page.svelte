<script lang="ts">
	// Legal — Act on Specified Commercial Transactions (特定商取引法に基づく表記)
	// NOTE: 【  】で囲った項目は事業者情報が未確定のためプレースホルダーです。
	// 開業・販売開始前に正式な内容へ差し替えてください。
	const rows: { label: string; value: string }[] = [
		{ label: '販売事業者', value: '株式会社都城クラフト蒸留所' },
		{ label: '運営統括責任者', value: '上村 一' },
		{ label: '所在地', value: '〒889-4602 宮崎県都城市山田町中霧島2453番地' },
		{ label: '電話番号', value: '0986-XX-XXXX（受付時間：平日 10:00–17:00）' },
		{ label: 'メールアドレス', value: 'info@scapewhisky.com' },
		{ label: '販売価格', value: '各商品ページに税込価格で表示します。' },
		{
			label: '商品代金以外の必要料金',
			value: '送料、代引手数料、銀行振込手数料、消費税。詳細は購入手続き時に表示します。'
		},
		{
			label: 'お支払い方法',
			value: 'クレジットカード、銀行振込、その他購入手続き時に表示する方法。'
		},
		{
			label: 'お支払い時期',
			value: 'クレジットカードは注文確定時。銀行振込はご注文後7日以内にお振込みください。'
		},
		{
			label: '商品の引渡時期',
			value: 'ご注文（入金確認）後、通常【  】営業日以内に発送します。受注生産品は別途ご案内します。'
		},
		{
			label: '返品・交換・キャンセル',
			value:
				'商品の性質上、お客様都合による返品・交換は原則お受けできません。万一、不良品・誤配送の場合は、商品到着後7日以内にご連絡いただければ、当ブランド負担にて交換いたします。'
		},
		{
			label: '酒類の販売について',
			value:
				'20歳未満の方への酒類の販売は固くお断りします。ご注文時に年齢確認を行います。'
		},
		{ label: '酒類販売管理者', value: '【酒類販売管理者氏名を記入】' },
		{ label: '酒類販売業免許', value: '【免許番号・交付税務署名を記入】' }
	];
</script>

<svelte:head>
	<title>特定商取引法に基づく表記 — Scape Whisky</title>
	<meta
		name="description"
		content="Scape Whisky の特定商取引法に基づく表記。販売事業者、支払方法、引渡時期、返品、酒類販売に関する事項。"
	/>
</svelte:head>

<article class="legalpage">
	<header class="legalpage-head">
		<p class="eyebrow">Legal</p>
		<h1 class="legalpage-title">特定商取引法に基づく表記</h1>
		<p class="legalpage-lead">
			特定商取引に関する法律第11条に基づき、以下のとおり表示します。
		</p>
	</header>

	<dl class="legal-spec">
		{#each rows as row (row.label)}
			<div class="legal-row">
				<dt>{row.label}</dt>
				<dd>{row.value}</dd>
			</div>
		{/each}
	</dl>

	<a href="/" class="legalpage-back">← Back to home</a>
</article>

<style>
	.legalpage {
		max-width: 720px;
		margin: 0 auto;
		padding-top: 120px;
		padding-bottom: var(--sp-12);
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
		font-size: clamp(26px, 4.5vw, 44px);
		line-height: 1.15;
		color: var(--c-text);
		margin: 0 0 var(--sp-6);
	}

	.legalpage-lead {
		font-family: var(--font-ja);
		font-size: 13px;
		line-height: 1.9;
		color: var(--c-text);
		opacity: 0.85;
		margin: 0;
	}

	.legal-spec {
		margin: 0 0 var(--sp-10);
	}

	.legal-row {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: var(--sp-5);
		padding: var(--sp-5) 0;
		border-bottom: 1px solid var(--c-line);
	}

	.legal-row dt {
		font-family: var(--font-en);
		font-weight: 700;
		font-size: 13px;
		line-height: 1.7;
		color: var(--c-text);
	}

	.legal-row dd {
		font-family: var(--font-ja);
		font-size: 13px;
		line-height: 1.85;
		color: var(--c-text);
		margin: 0;
	}

	.legalpage-back {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 13px;
		color: var(--c-text);
		text-decoration: none;
		border-bottom: 1px solid var(--c-line);
		padding-bottom: 4px;
		transition: opacity var(--duration-default) ease;
	}

	.legalpage-back:hover {
		opacity: 0.6;
	}

	@media (max-width: 540px) {
		.legal-row {
			grid-template-columns: 1fr;
			gap: var(--sp-2);
		}
	}
</style>

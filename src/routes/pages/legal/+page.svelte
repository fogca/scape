<script lang="ts">
	// Legal — Act on Specified Commercial Transactions (特定商取引法に基づく表記).
	// Sales have not started yet, so this page carries a holding notice until
	// the full required disclosures are published at launch.
</script>

<article class="legalpage">
	<header class="legalpage-head">
		<p class="eyebrow">Legal</p>
		<h1 class="legalpage-title">特定商取引法に<br />基づく表記</h1>
		<p class="legalpage-lead">
			Scape Whiskyは、株式会社都城クラフト蒸留所が運営するウイスキーブランドです。
		</p>
	</header>

	<div class="legal-body">
		<p>
			現在、当サイトでは商品の販売、予約受付、決済を行っておりません。商品の販売を開始する際には、特定商取引に関する法律に基づき、販売条件、支払方法、引渡時期、返品・交換条件、酒類販売に関する表示等を本ページにて掲載いたします。
		</p>
		<p>
			20歳未満の方への酒類の販売は固くお断りします。ご注文時に年齢確認を行います。
		</p>
	</div>
</article>

<style>
	.legalpage {
		max-width: 720px;
		margin: 0 auto;
		padding-top: 120px;
		padding-bottom: var(--sp-5);
	}

	.legalpage-head {
		margin-bottom: var(--sp-7);
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
		font-family: var(--font-ja);
		font-weight: 700;
		font-size: 48px;
		line-height: 1.4;
		letter-spacing: 0;
		color: var(--c-text);
		margin: 0 0 var(--sp-6);
	}

	.legalpage-lead {
		font-family: var(--font-ja);
		font-weight: 700;
		font-size: 14px;
		line-height: 1.9;
		color: var(--c-text);
		margin: 0;
	}

	.legal-body {
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
	}

	.legal-body p {
		font-family: var(--font-ja);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.95;
		color: var(--c-text);
		margin: 0;
	}

	@media (max-width: 540px) {
		.legalpage {
			margin-inline: 0;
		}

		.legalpage-title {
			font-size: 40px;
		}

		.legalpage-lead,
		.legal-body p {
			font-size: 13px;
		}
	}
</style>

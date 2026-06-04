<script lang="ts">
	// Privacy Policy — Scape Whisky
	const UPDATED = '2026年6月1日';
</script>

<svelte:head>
	<title>Privacy Policy — Scape Whisky</title>
	<meta
		name="description"
		content="Scape Whisky のプライバシーポリシー。個人情報の取得・利用目的・管理・お問い合わせ窓口について。"
	/>
</svelte:head>

<article class="legalpage">
	<header class="legalpage-head">
		<p class="eyebrow">Privacy Policy</p>
		<h1 class="legalpage-title">プライバシーポリシー</h1>
		<p class="legalpage-lead">
			Scape Whisky（以下「当ブランド」といいます）は、お客様の個人情報を適切に保護することを社会的責務と考え、以下の方針に基づき個人情報を取り扱います。
		</p>
	</header>

	<section class="legalpage-section">
		<h2>1. 取得する情報</h2>
		<p>当ブランドは、サービスの提供にあたり、以下の情報を取得することがあります。</p>
		<ul>
			<li>お名前、メールアドレス、電話番号、住所などの連絡先情報</li>
			<li>お問い合わせ・ご購入・カスクオーナーシップに関するやり取りの内容</li>
			<li>年齢確認のための生年月日（酒類の販売・提供時）</li>
			<li>Cookie、閲覧履歴、IPアドレス、ブラウザ情報などのアクセス情報</li>
		</ul>
	</section>

	<section class="legalpage-section">
		<h2>2. 利用目的</h2>
		<p>取得した個人情報は、以下の目的の範囲内で利用します。</p>
		<ul>
			<li>商品の販売・発送、カスクオーナーシップの提供および各種ご連絡のため</li>
			<li>お問い合わせ・取材・コラボレーションへの対応のため</li>
			<li>年齢確認および法令上の義務の履行のため</li>
			<li>サービスの改善、ならびに当ブランドからのご案内（ご希望の場合）のため</li>
		</ul>
	</section>

	<section class="legalpage-section">
		<h2>3. 第三者への提供</h2>
		<p>
			当ブランドは、次の場合を除き、お客様の同意なく個人情報を第三者へ提供しません。
		</p>
		<ul>
			<li>法令に基づく場合</li>
			<li>人の生命・身体・財産の保護のために必要で、本人の同意取得が困難な場合</li>
			<li>商品の配送、決済等の業務を委託先に委託する場合（必要な範囲に限ります）</li>
		</ul>
	</section>

	<section class="legalpage-section">
		<h2>4. Cookie・アクセス解析</h2>
		<p>
			当サイトでは、サービス向上のために Cookie および
			アクセス解析ツールを利用する場合があります。これらにより取得される情報は
			統計的に処理され、個人を特定するものではありません。ブラウザの設定により
			Cookie の利用を無効化することができます。
		</p>
	</section>

	<section class="legalpage-section">
		<h2>5. 安全管理</h2>
		<p>
			当ブランドは、個人情報の漏えい・滅失・毀損の防止その他の安全管理のために、
			必要かつ適切な措置を講じます。
		</p>
	</section>

	<section class="legalpage-section">
		<h2>6. 開示・訂正・削除のご請求</h2>
		<p>
			お客様は、ご自身の個人情報について、開示・訂正・利用停止・削除を請求することが
			できます。ご請求の際は、下記お問い合わせ窓口までご連絡ください。本人確認の上、
			法令に従い速やかに対応いたします。
		</p>
	</section>

	<section class="legalpage-section">
		<h2>7. 本ポリシーの改定</h2>
		<p>
			当ブランドは、必要に応じて本ポリシーを改定することがあります。改定後の内容は、
			当サイトに掲載した時点から効力を生じます。
		</p>
	</section>

	<section class="legalpage-section">
		<h2>8. お問い合わせ窓口</h2>
		<p>本ポリシーおよび個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。</p>
		<p>
			Scape Whisky<br />
			Email: <a href="mailto:info@scapewhisky.com">info@scapewhisky.com</a>
		</p>
	</section>

	<p class="legalpage-updated">最終改定日：{UPDATED}</p>

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
		margin-bottom: var(--sp-10);
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
		font-size: clamp(28px, 5vw, 48px);
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

	.legalpage-section {
		margin-bottom: var(--sp-8);
	}

	.legalpage-section h2 {
		font-family: var(--font-en);
		font-weight: 700;
		font-size: 16px;
		line-height: 1.4;
		color: var(--c-text);
		margin: 0 0 var(--sp-4);
	}

	.legalpage-section p {
		font-family: var(--font-ja);
		font-size: 13px;
		line-height: 1.9;
		color: var(--c-text);
		margin: 0 0 var(--sp-3);
	}

	.legalpage-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.legalpage-section li {
		position: relative;
		font-family: var(--font-ja);
		font-size: 13px;
		line-height: 1.9;
		color: var(--c-text);
		padding-left: 1.2em;
	}

	.legalpage-section li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--c-accent);
	}

	.legalpage-section a,
	.legalpage-updated a {
		color: var(--c-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.legalpage-updated {
		font-family: var(--font-en);
		font-size: 11px;
		color: var(--c-mute);
		margin: var(--sp-10) 0 var(--sp-8);
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
</style>

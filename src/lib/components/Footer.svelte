<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import Arrow from './Arrow.svelte';

	// Teaser build: minimal footer — brand, tagline, contact, copyright.
	// Site nav / social / legal links return with the full site (see /full).
	const YEAR = new Date().getFullYear();
</script>

<footer class="footer" aria-labelledby="footer-heading">
	<h2 id="footer-heading" class="sr-only">Scape Whisky</h2>

	<div class="footer-grid">
		<div class="footer-col footer-col--brand">
			<a href="#top" class="footer-logo" aria-label="Scape">
				<Wordmark />
			</a>
			<p class="footer-tagline">
				Japanese landscape whisky,<br />
				distilled in Miyazaki.
			</p>
		</div>

		<div class="footer-col footer-col--cta">
			<h3 class="footer-heading">Get in touch</h3>
			<p class="footer-note">
				プロダクト、カスクオーナーシップ、取材・コラボレーションのご相談はこちらから。
			</p>
			<a href="mailto:info@scapewhisky.com" class="footer-cta">
				<span>info@scapewhisky.com</span>
				<Arrow color="var(--c-white)" />
			</a>
		</div>
	</div>

	<div class="footer-divider" aria-hidden="true"></div>

	<div class="footer-bottom">
		<p class="footer-copy">© Scape Whisky, {YEAR}</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--c-dark);
		color: var(--c-white);
		padding: 80px 0 var(--sp-5);
		margin-top: 0;
	}

	.footer :global(*) {
		color: inherit;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sp-8);
		padding-inline: var(--padding);
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	.footer-col--brand {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--sp-6);
	}

	.footer-logo {
		display: inline-flex;
		color: inherit;
		text-decoration: none;
		line-height: 0;
		align-self: flex-start;
	}

	.footer-logo :global(svg) {
		height: 60px;
		width: auto;
		display: block;
	}

	.footer-tagline {
		position: absolute;
		top: 0;
		right: 0;
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 13px;
		line-height: 1.6;
		opacity: 0.7;
		margin: 0;
		writing-mode: vertical-rl;
		white-space: nowrap;
	}

	.footer-heading {
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 13px;
		letter-spacing: 0;
		opacity: 0.5;
		margin: 0;
	}

	.footer-note {
		font-family: var(--font-ja);
		font-weight: 400;
		font-size: 13px;
		line-height: 1.7;
		opacity: 0.7;
		margin: 0;
	}

	.footer-cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-en);
		font-weight: 500;
		font-size: 13px;
		color: inherit;
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 241, 220, 0.4);
		padding-bottom: 4px;
		align-self: flex-start;
		transition: border-color var(--duration-default) ease;
	}

	.footer-cta :global(svg) {
		transition: transform var(--duration-default) var(--ease-out);
	}

	.footer-cta:hover :global(svg) {
		transform: translateX(3px);
	}

	.footer-cta:hover {
		border-bottom-color: var(--c-white);
	}

	/* 100vw thin divider */
	.footer-divider {
		width: 100vw;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		height: 1px;
		background: rgba(255, 241, 220, 0.15);
		margin-top: var(--sp-10);
		margin-bottom: var(--sp-5);
	}

	.footer-bottom {
		padding-inline: var(--padding);
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: baseline;
		opacity: 0.5;
	}

	.footer-copy {
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 10.5px;
		margin: 0;
		white-space: nowrap;
	}

	@media (min-width: 768px) {
		.footer-grid {
			grid-template-columns: 2fr 2fr;
			gap: var(--sp-7);
		}

		.footer-col--brand {
			padding-right: 8vw;
		}
	}
</style>

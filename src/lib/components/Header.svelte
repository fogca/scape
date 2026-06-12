<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Wordmark from './Wordmark.svelte';
	import { lockScroll, unlockScroll } from '$lib/scroll';

	// Teaser build: minimal header — wordmark only, revealed after the hero.
	// Nav / cart return when the full site is implemented (see /full).
	let revealed = $state(false);
	let menuOpen = $state(false);

	// Hamburger is hidden on the teaser top, shown everywhere else.
	const showMenu = $derived(page.url.pathname !== '/');

	const NAV = [
		{ href: '/full', label: 'Top' },
		{ href: '/about', label: 'About' },
		{ href: '/cask-owner', label: 'Cask Owner' },
		{ href: 'mailto:info@scapewhisky.com', label: 'Contact' }
	];

	function toggleMenu() {
		menuOpen = !menuOpen;
		if (menuOpen) {
			lockScroll();
		} else {
			unlockScroll();
		}
	}

	function closeMenu() {
		if (!menuOpen) return;
		menuOpen = false;
		unlockScroll();
	}

	$effect(() => {
		if (!browser) return;
		const onScroll = () => {
			revealed = window.scrollY > window.innerHeight - 80;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Close on route change + Escape
	$effect(() => {
		page.url.pathname;
		closeMenu();
	});

	$effect(() => {
		if (!browser || !menuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMenu();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<header class="brand" class:revealed class:menu-open={menuOpen}>
	<a href="#top" class="wordmark" aria-label="Scape">
		<Wordmark />
	</a>

	{#if showMenu}
		<button
			class="menu"
			type="button"
			aria-label="Menu"
			aria-expanded={menuOpen}
			onclick={toggleMenu}
		>
			<span class="menu-line"></span>
			<span class="menu-line"></span>
		</button>
	{/if}
</header>

{#if menuOpen}
	<nav class="overlay" aria-label="Site menu">
		<ul class="overlay-nav">
			{#each NAV as item (item.href)}
				<li>
					<a href={item.href} onclick={closeMenu}>{item.label}</a>
				</li>
			{/each}
		</ul>
		<ul class="overlay-legal">
			<li><a href="/privacy" onclick={closeMenu}>Privacy</a></li>
			<li><a href="/legal" onclick={closeMenu}>Legal</a></li>
		</ul>
	</nav>
{/if}

<style>
	.brand {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: calc(var(--z-overlay) + 2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25px var(--padding) 20px;
		background: transparent;
		color: var(--c-accent);
		transform: translateY(-100%);
		transition: transform var(--duration-slow) var(--ease-out);
	}

	.brand.revealed {
		transform: translateY(0);
	}

	.wordmark {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		line-height: 0;
	}

	.wordmark :global(svg) {
		height: 24px;
		width: auto;
		display: block;
	}

	.menu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2px;
		width: 24px;
		height: 32px;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		color: inherit;
		z-index: calc(var(--z-overlay) + 3);
	}

	.menu-line {
		display: block;
		width: 100%;
		height: 2px;
		background: currentColor;
		transition: transform var(--duration-default) var(--ease-out);
	}

	.menu:hover .menu-line:first-child {
		transform: translateY(-1px);
	}

	.menu:hover .menu-line:last-child {
		transform: translateY(1px);
	}

	/* Open state — lines collapse into an X */
	.menu-open .menu .menu-line:first-child {
		transform: translateY(2px) rotate(45deg);
	}

	.menu-open .menu .menu-line:last-child {
		transform: translateY(-2px) rotate(-45deg);
	}

	/* ───── Overlay menu ───── */
	.overlay {
		position: fixed;
		inset: 0;
		z-index: calc(var(--z-overlay) + 1);
		background: var(--c-deep);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 var(--padding);
		animation: overlay-in var(--duration-default) var(--ease-out) both;
	}

	@keyframes overlay-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.overlay-nav {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	.overlay-nav a {
		font-family: var(--font-en);
		font-weight: 900;
		font-size: clamp(36px, 6vw, 64px);
		line-height: 1.1;
		color: var(--c-accent);
		text-decoration: none;
		transition: color var(--duration-default) ease;
	}

	.overlay-nav a:hover {
		color: var(--c-white);
	}

	.overlay-legal {
		list-style: none;
		margin: var(--sp-8) 0 0;
		padding: 0;
		display: flex;
		gap: var(--sp-5);
	}

	.overlay-legal a {
		font-family: var(--font-en);
		font-weight: 400;
		font-size: 10.5px;
		color: var(--c-white);
		opacity: 0.6;
		text-decoration: none;
		transition: opacity var(--duration-default) ease;
	}

	.overlay-legal a:hover {
		opacity: 1;
	}
</style>

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			// Per-page SEO overrides; the layout falls back to site defaults.
			title?: string;
			description?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

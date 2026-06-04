<script lang="ts">
	type Props = {
		size?: number;
		color?: string;
		class?: string;
	};
	let { size = 9, color = 'currentColor', class: className = '' }: Props = $props();

	const width = size;
	const height = size * (14 / 9);
</script>

<svg
	class={className}
	{width}
	{height}
	viewBox="0 0 9 14"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<path
		d="M2.16313 14C2.16313 14 1.80713 13.3129 1.29811 12.8174C0.789093 12.3218 0.0259545 11.9741 0.0259545 11.9741C0.0259545 11.9741 1.64946 10.8617 3.08742 9.4618C4.52537 8.06195 5.32686 7.11313 5.32686 7.11313C5.32686 7.11313 4.12366 5.58507 2.73064 4.22896C1.33762 2.87286 0 1.97231 0 1.97231C0 1.97231 0.79258 1.54579 1.28184 1.0695C1.7711 0.593201 2.18908 0 2.18908 0C2.18908 0 3.3857 1.74114 5.17462 3.48303C6.96354 5.22492 9 7.16404 9 7.16404C9 7.16404 7.33078 8.44058 5.35243 10.3665C3.37408 12.2924 2.16313 14 2.16313 14Z"
		fill={color}
	/>
</svg>

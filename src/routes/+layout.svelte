<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/y.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /><title>Y</title></svelte:head>
{@render children()}

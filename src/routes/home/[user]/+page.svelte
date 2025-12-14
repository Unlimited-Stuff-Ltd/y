<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Account - Y</title>
</svelte:head>

<main class="p-5">
	<h1 class="text-4xl font-black">{page.params.user}</h1>
</main>

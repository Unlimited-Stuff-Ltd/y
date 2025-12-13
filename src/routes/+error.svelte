<script lang="ts">
	import { Button } from '$lib/components';
	import { page } from '$app/state';
	import y from '$lib/assets/y.svg';
</script>

<svelte:head>
	<title>{page.status}: {page.error?.message}</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center">
	<div class="text-center">
		<img src={y} alt="y logo" class="w-50" />
		<div class="h-20"></div>
		<h1 class="text-2xl font-black">{page.status}: {page.error?.message}</h1>
		<div class="h-10"></div>
		<Button href="/">Home</Button>
	</div>
</div>

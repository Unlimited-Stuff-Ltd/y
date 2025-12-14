<script lang="ts">
	import { goto } from '$app/navigation';
	import { Loading } from '$lib/components';
	import { onMount } from 'svelte';

	onMount(() => {
		localStorage.removeItem('user-code');
		goto('/');
	});
</script>

<svelte:head><title>Loading - Y</title></svelte:head>

<Loading />

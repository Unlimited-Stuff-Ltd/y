<script lang="ts">
	import type { PageProps } from '../../$types';
	import { Loading } from '$lib/components';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	onMount(() => {
		// @ts-expect-error TS Error checking cannot find data.username
		const username = data.username;
		localStorage.setItem('user-code', username);
		goto(`/home/${username}`, { replaceState: true });
	});
</script>

<svelte:head><title>Loading - Y</title></svelte:head>

<Loading />

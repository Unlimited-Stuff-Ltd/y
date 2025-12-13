<script lang="ts">
	import type { PageProps } from '../$types';
	import { Loading } from '$lib/components';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	onMount(() => {
		// @ts-expect-error
		localStorage.setItem('user-code', data.username);
		goto('/home');
	});
</script>

<Loading />
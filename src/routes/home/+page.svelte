<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Loading } from '$lib/components';

	onMount(() => {
		const userCode = localStorage.getItem('user-code');
		if (userCode) {
			goto(`/home/${userCode}`);
		} else {
			goto('/?e=3');
		}
	});
</script>

<svelte:head><title>Loading - y</title></svelte:head>

<Loading />

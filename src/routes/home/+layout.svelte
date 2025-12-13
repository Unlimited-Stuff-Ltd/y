<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const userCode = localStorage.getItem('user-code');
		if (!userCode) {
			goto('/?e=3');
		} else {
			goto(`/home/${userCode}`);
		}
	});

	let { children } = $props();
</script>

{@render children()}

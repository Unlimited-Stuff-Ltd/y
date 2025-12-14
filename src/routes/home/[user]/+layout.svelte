<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import y from '$lib/assets/y.svg';
	import { NavButton } from '$lib/components';
	import { page } from '$app/state';

	onMount(() => {
		const userCode = localStorage.getItem('user-code');
		if (!userCode) {
			goto('/?e=3');
		}
	});

	let { children } = $props();
</script>

<nav class="fixed h-screen w-50 border-r">
	<div class="flex h-50 w-50 items-center justify-center">
		<img src={y} alt="y logo" class="m-auto h-20 w-20" />
	</div>
	<div class="w-50">
		<NavButton href="/home/{page.params.user}" text="Home " /><br />
		<NavButton href="/home/{page.params.user}/account" text="Account" />
	</div>
</nav>

<div class="flex">
	<div class="w-50"></div>
	<div>{@render children()}</div>
</div>

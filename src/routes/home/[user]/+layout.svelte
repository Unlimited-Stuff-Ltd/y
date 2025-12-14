<script lang="ts">
	import type { LayoutProps } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import y from '$lib/assets/y.svg';
	import { NavButton } from '$lib/components';
	import { page } from '$app/state';

	let { data, children }: LayoutProps = $props();

	onMount(() => {
		if (data.code === 1) {
			window.location.assign('/?e=1');
		} else if (data.code === 4) {
			window.location.assign('/?e=4');
		}
		const userCode = localStorage.getItem('user-code');
		if (!userCode) {
			goto('/?e=3');
		}
	});
</script>

<nav class="fixed h-screen w-50 border-r">
	<div class="flex h-50 w-50 items-center justify-center">
		<button onclick={() => goto(`/home/${page.params.user}`)} class="cursor-pointer">
			<img src={y} alt="y logo" class="m-auto h-20 w-20" />
		</button>
	</div>
	<div class="w-50">
		<NavButton href="/home/{page.params.user}" text="Home " /><br />
		<NavButton href="/home/{page.params.user}/account/posts" text="Your Posts" /><br />
		<NavButton href="/home/{page.params.user}/account" text="Account" /><br />
	</div>
</nav>

<div class="flex">
	<div class="w-50"></div>
	<div>{@render children()}</div>
</div>

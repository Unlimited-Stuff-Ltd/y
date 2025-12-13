<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import y from '$lib/assets/y.svg';
	import { Button, NavButton, AlertDialog } from '$lib/components';
	import { page } from '$app/state';

	onMount(() => {
		const userCode = localStorage.getItem('user-code');
		if (!userCode) {
			goto('/?e=3');
		}
	});

	let signOutDialogOpen = $state(false);

	function signOutDialog() {
		signOutDialogOpen = true;
	}

	function signOut() {
		localStorage.removeItem('user-code');
		window.location.assign('/');
	}

	let { children } = $props();
</script>

<AlertDialog.Root bind:open={signOutDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure you want to sign out?</AlertDialog.Title>
			<AlertDialog.Description>
				You will have to re-enter you sign in credentials if you want to access anything again.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<Button onclick={signOut}>Continue</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<nav class="fixed h-screen w-50 border-r">
	<div class="flex h-50 w-50 items-center justify-center">
		<img src={y} alt="y logo" class="m-auto h-20 w-20" />
	</div>
	<div class="ml-5 w-50">
		<NavButton href="/home/{page.params.user}" text="Home " /><br />
		<NavButton href="/home/{page.params.user}/account" text="Account" /><br />
		<Button variant="link" onclick={signOutDialog} class="text-base">Sign Out</Button>
	</div>
</nav>

<div class="flex">
	<div class="w-50"></div>
	<div>{@render children()}</div>
</div>

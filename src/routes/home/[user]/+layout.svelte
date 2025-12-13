<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import y from '$lib/assets/y.svg';
	import { Button, NavButton, AlertDialog } from '$lib/components';
	import { page } from '$app/state';
	import Input from '$lib/components/ui/input/input.svelte';

	onMount(() => {
		const userCode = localStorage.getItem('user-code');
		if (!userCode) {
			goto('/?e=3');
		}
	});

	let signOutDialogOpen = $state(false);
	let deleteDialogOpen = $state(false);

	function signOutDialog() {
		signOutDialogOpen = true;
	}

	function signOut() {
		localStorage.removeItem('user-code');
		window.location.assign('/');
	}

	function deleteDialog() {
		deleteDialogOpen = true;
	}

	let deleteButtonDisabled = $state(true);

	let deleteName = $state('');

	function onkeyup() {
		if (deleteName === page.params.user) {
			deleteButtonDisabled = false;
		}
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

<AlertDialog.Root bind:open={deleteDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure you want to delete your account?</AlertDialog.Title>
			<AlertDialog.Description
				>This action is irreversible. Once you delete your account, all your posts and data will be
				deleted from our servers.</AlertDialog.Description
			>
		</AlertDialog.Header>
		<Input bind:value={deleteName} placeholder="Please enter your username" {onkeyup} />
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<Button
				variant="destructive"
				href="/home/delete/{page.params.user}"
				disabled={deleteButtonDisabled}>Continue</Button
			>
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
		<Button variant="link" onclick={signOutDialog} class="text-base">Sign Out</Button><br />
		<Button variant="link" onclick={deleteDialog} class="text-base text-red-500"
			>Delete Account</Button
		>
	</div>
</nav>

<div class="flex">
	<div class="w-50"></div>
	<div>{@render children()}</div>
</div>

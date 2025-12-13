<script lang="ts">
	import type { PageProps } from './$types';
	import { Loading, Input, Button, Label, AlertDialog } from '$lib/components';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { data }: PageProps = $props();

	let loading = $state(true);

	let user: any = $state({
		displayName: ''
	});

	let file: any = $state();

	onMount(() => {
		data.user.then((a) => {
			user.displayName = a[0].displayName;
			const icon: any = a[0].icon;
			if (icon) {
				const bytes = Uint8Array.from(icon.split(',').map(Number));
				const blob = new Blob([bytes], { type: 'image/png' });
				file = URL.createObjectURL(blob);
			}
			loading = false;
		});
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
</script>

<svelte:head>
	<title>Account - y</title>
</svelte:head>

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

{#if loading}
	<Loading />
{:else}
	<div class="w-left flex h-screen items-center justify-center">
		<div class="text-center">
			{#if file}
				<img src={file} alt="the users icon" class="m-auto mb-5 h-40 w-40 rounded-xl border-2" />
			{/if}
			<h2 class="mb-5 text-2xl font-black">{user.displayName}</h2>
			<hr />
			<h1 class="mt-5 text-xl font-black">Change Details</h1>
			<form
				method="POST"
				action="/home/{page.params.user}/account/loading"
				enctype="multipart/form-data"
			>
				<Label class="mt-2 mb-1.5" for="displayName">Display Name:</Label>
				<Input
					name="displayName"
					placeholder={user.displayName}
					class="font-bold"
					id="displayName"
				/>
				<Label class="mt-10 mb-1.5" for="fileInput">Icon</Label>
				<Input name="file" id="fileInput" type="file" accept="image/png, image/jpeg" />
				<Button class="mt-5 mb-10" type="submit">Save</Button>
			</form>
			<hr />
			<div class="mt-5 flex items-center justify-center">
				<Button class="mr-5" onclick={signOutDialog}>Sign Out</Button>
				<Button variant="destructive" onclick={deleteDialog}>Delete Account</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.w-left {
		width: calc(100vw - 12.5rem);
	}
</style>

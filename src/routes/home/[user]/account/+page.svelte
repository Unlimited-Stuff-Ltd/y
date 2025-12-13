<script lang="ts">
	import type { PageProps } from './$types';
	import { Loading, Input, Button, Label } from '$lib/components';
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
</script>

<svelte:head>
	<title>Account - y</title>
</svelte:head>

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
			<h1 class="mt-5 text-xl font-black">Change</h1>
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
				<Button class="mt-5" type="submit">Save</Button>
			</form>
		</div>
	</div>
{/if}

<style>
	.w-left {
		width: calc(100vw - 12.5rem);
	}
</style>

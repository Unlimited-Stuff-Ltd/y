<script lang="ts">
	import { Button, Input, Loading } from '$lib/components';
	import y from '$lib/assets/y.svg';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let login = $state(false);
	let signup = $state(false);

	let loginUsername = $state('');
	let signupUsername = $state('');
	let signupDisplayName = $state('');

	let loading = $state(true);

	let errorText = $state('');

	let loggedIn = $state(false);
	let link = $state('');

	function signupFunc() {
		errorText = '';
		login = false;
		signup = true;
	}

	function loginFunc() {
		errorText = '';
		signup = false;
		login = true;
	}

	function back() {
		errorText = '';
		signup = false;
		login = false;
	}

	const okChars = 'abcdefghijklmnopqrstuvwxyz1234567890-';

	function signupForm() {
		for (let i = 0; i < signupUsername.length; i++) {
			if (!okChars.includes(signupUsername[i].toLowerCase())) {
				errorText = 'Username can only include letters, numbers and hyphens';
				return;
			}
		}
		loading = true;
		window.location.assign(`/signup/${signupUsername}/${signupDisplayName}`);
	}

	function loginForm() {
		loading = true;
		window.location.assign(`/login/${loginUsername}`);
	}

	onMount(() => {
		const e = page.url.searchParams.getAll('e');
		const userCode = localStorage.getItem('user-code');
		if (userCode) {
			link = `/home/${userCode}`;
			loggedIn = true;
			loading = false;
		} else if (e.length > 0) {
			switch (e[0]) {
				case '1':
					errorText = 'User not found';
					loading = false;
					goto('/', { replaceState: true });
					break;
				case '2':
					errorText = 'Username already exists';
					loading = false;
					goto('/', { replaceState: true });
					break;
				case '3':
					errorText = 'Please sign in first';
					loading = false;
					goto('/', { replaceState: true });
					break;
				case '4':
					errorText = 'There was an error';
					loading = false;
					goto('/', { replaceState: true });
					break;
			}
		} else {
			loading = false;
		}
	});
</script>

<svelte:head><title>y. Because why not</title></svelte:head>

{#if loading}
	<Loading />
{:else}
	<main class="grid grid-cols-2">
		<div class="flex h-screen w-[50vw] items-center justify-center">
			<img src={y} alt="y logo" class="w-100" />
		</div>
		<div class="flex h-screen w-[50vw] items-center justify-center">
			<div class="text-center">
				<p class="text-4xl font-black">Y. Because why not</p>
				<br />
				<div class="h-60">
					{#if loggedIn}
						<Button href={link}>Home</Button>
					{:else}
						<div class="h-40">
							{#if !signup}
								{#if !login}
									<Button onclick={loginFunc}>Log In</Button>
								{:else}
									<h2 class="mb-4 text-2xl font-bold">Log In</h2>
									<form onsubmit={loginForm} class="flex">
										<Input bind:value={loginUsername} type="text" placeholder="Username" required />
										<Button type="submit" class="ml-2">Log In</Button>
									</form>
									<Button variant="link" onclick={back}>Back</Button>
								{/if}
							{/if}
							{#if !login}
								{#if !signup}
									<Button onclick={signupFunc}>Sign Up</Button>
								{:else}
									<h2 class="mb-4 text-2xl font-bold">Sign Up</h2>
									<form onsubmit={signupForm}>
										<Input
											bind:value={signupUsername}
											type="text"
											placeholder="Username"
											required
										/>
										<div class="mt-2 flex">
											<Input
												bind:value={signupDisplayName}
												type="text"
												placeholder="Display Name"
												required
											/>
											<Button type="submit" class="ml-2">Sign Up</Button>
										</div>
									</form>
									<Button variant="link" onclick={back}>Back</Button>
								{/if}
							{/if}
						</div>
					{/if}
					<p class="m-auto w-80 text-center font-bold text-red-400">{errorText}</p>
				</div>
			</div>
		</div>
	</main>
{/if}

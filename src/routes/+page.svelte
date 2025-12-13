<script lang="ts">
	import { Button, Input, Loading } from '$lib/components';
	import y from '$lib/assets/y.svg';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let login = $state(false);
	let signup = $state(false);

	let loading = $state(true);

	function signupFunc() {
		login = false;
		signup = true;
	}

	function loginFunc() {
		signup = false;
		login = true;
	}

	onMount(() => {
		if (localStorage.getItem('user-code')) {
			goto('/home');
		} else {
			loading = false;
		}
	});
</script>

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
				{#if !login}
					<Button onclick={loginFunc}>Log In</Button>
				{:else}
					<form method="POST" action="/login" class="flex">
						<Input name="code" type="text" placeholder="User Code" required />
						<Button type="submit" class="ml-2">Log In</Button>
					</form>
				{/if}
				<div class="h-5"></div>
				{#if !signup}
					<Button onclick={signupFunc}>Sign Up</Button>
				{:else}
					<form method="POST" action="/signup" class="flex">
						<Input name="username" type="text" placeholder="Username" required />
						<Button type="submit" class="ml-2">Sign Up</Button>
					</form>
				{/if}
			</div>
		</div>
	</main>
{/if}

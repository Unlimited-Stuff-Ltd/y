<script lang="ts">
	import { Post, Loading } from '$lib/components';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();

	let file = $state('');

	onMount(() => {
		const user = data.user?.[0] ?? { displayName: '', icon: '' };
		const icon: any = user.icon;
		if (icon) {
			const bytes = Uint8Array.from(icon.split(',').map(Number));
			const blob = new Blob([bytes], { type: 'image/png' });
			file = URL.createObjectURL(blob);
		}
	});
</script>

<svelte:head>
	<title>Account - Y</title>
</svelte:head>

{#await data.posts}
	<Loading />
{:then posts}
	<main>
		<div class="flex items-center justify-center border-b p-5">
			<img src={file} alt="the users icon" class="mr-3 h-12 w-12 rounded-[50%] border" />
			<h1 class="text-2xl font-black">{data.user?.[0].displayName}</h1>
		</div>
		<div class="grid grid-cols-2 pt-8">
			<div class="w-half text-center">
				<h1 class="mb-6 text-3xl font-bold">Trending Posts</h1>
				{#each posts as post (post.id)}
					<Post
						id={post.id}
						icon="https://avatars.githubusercontent.com/u/156860750"
						poster="the Okapi"
						contents={post.content}
						date={new Date(post.date)}
						recommends={post.recommendations}
						image={post.image}
						recommended={data.user?.[0].recommendations.includes(post.id)}
					/>
					<div class="h-2"></div>
				{/each}
			</div>
			<div class="w-half text-center">
				<h1 class="mb-6 text-3xl font-bold">For You</h1>
				<Post
					id="hello"
					icon="https://avatars.githubusercontent.com/u/156860750"
					image="https://avatars.githubusercontent.com/u/156860750"
					poster="the Okapi"
					contents="This is a test post on Y. This is the first post I will be seeing."
					date={new Date('December 12 2025, 1:08 pm')}
					recommends={121}
				/>
			</div>
		</div>
	</main>
{/await}

<style>
	.w-half {
		width: calc(calc(100vw - 12.5rem) / 2);
	}
</style>

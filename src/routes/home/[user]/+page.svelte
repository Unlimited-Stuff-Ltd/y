<script lang="ts">
	import { Post, Loading } from '$lib/components';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();

	let file = $state('');

	onMount(() => {
		const user = data.user?.[0] ?? { displayName: '', icon: '' };
		file = user.icon;
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
		<div class="w-half text-center">
			<h1 class="mt-3 mb-6 text-3xl font-bold">Trending Posts</h1>
			<div class="grid grid-cols-2">
				{#each posts as post (post.id)}
					<Post
						id={post.id}
						icon={post.userIcon}
						poster={post.userDisplayName}
						contents={post.content}
						date={new Date(post.date)}
						recommends={post.recommendations}
						image={post.image}
						recommended={data.user?.[0].recommendations.includes(post.id)}
					/>
					<div class="h-2"></div>
				{/each}
			</div>
		</div>
	</main>
{/await}

<style>
	.w-half {
		width: calc(100vw - 12.5rem);
	}
</style>

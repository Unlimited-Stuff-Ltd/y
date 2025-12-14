<script lang="ts">
	import { Post } from '$lib/components';
</script>

<svelte:head>
	<title>Account - Y</title>
</svelte:head>

<div class="grid grid-cols-2 pt-8">
	<div class="w-half m-auto text-center">
		<h1 class="mb-6 text-3xl font-bold">Trending Posts</h1>
		<Post
			icon="https://avatars.githubusercontent.com/u/156860750"
			poster="the Okapi"
			contents="This is a test post on Y. This is the first post I will be seeing."
			date={new Date('December 12 2025, 1:08 pm')}
			recommends={121}
		/>
	</div>
	<div class="w-half m-auto text-center">
		<h1 class="mb-6 text-3xl font-bold">For You</h1>
		<Post
			icon="https://avatars.githubusercontent.com/u/156860750"
			poster="the Okapi"
			contents="This is a test post on Y. This is the first post I will be seeing."
			date={new Date('December 12 2025, 1:08 pm')}
			recommends={121}
		/>
	</div>
</div>

<style>
	.w-half {
		width: calc(calc(100vw - 12.5rem) / 2);
	}
</style>

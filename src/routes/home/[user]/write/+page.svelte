<script lang="ts">
	import { Textarea, Input, Label, Button } from '$lib/components';
</script>

<svelte:head><title>Write a post - Y</title></svelte:head>

<main class="w-half flex h-screen items-center justify-center">
	<form class="rounded-lg border px-6 pt-3 pb-6 text-center" method="POST">
		<h1 class="text-center text-xl font-black">Write a post</h1>
		<Label for="contents" class="mb-1.5">Contents:</Label>
		<Textarea id="contents" name="contents" class="mb-5 h-40 w-100 resize-none" maxlength={250} />
		<Label for="image" class="mb-1.5">Image:</Label>
		<Input id="image" name="image" type="text" class="mb-5" />
		<Button type="submit">Post</Button>
	</form>
</main>

<style>
	.w-half {
		width: calc(100vw - 12.5rem);
	}
</style>

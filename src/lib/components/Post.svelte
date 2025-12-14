<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { SvelteDate } from 'svelte/reactivity';

	let { id, icon, poster, contents, date, recommends, image, recommended = false } = $props();

	function formatDate(toFormat: Date) {
		const now = new SvelteDate();
		const todayDate = now.toLocaleDateString();
		now.setDate(now.getDate() - 1);
		const yesterdayDate = now.toLocaleDateString();
		const dateDate = toFormat.toLocaleDateString();
		const timeString = toFormat.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
		if (dateDate === todayDate) {
			return timeString;
		} else if (dateDate === yesterdayDate) {
			return `Yesterday, ${timeString}`;
		} else {
			return `${dateDate}, ${timeString}`;
		}
	}
</script>

<div class="m-auto w-120 rounded-3xl border p-6">
	<div class="flex w-fit items-center justify-center">
		<img src={icon} class="mr-2 w-14 rounded-[50%] border" alt="The user's icon" />
		<h2 class="text-xl font-bold">{poster}</h2>
		<h3 class="ml-2 text-neutral-400">{formatDate(date)}</h3>
	</div>
	{#if image}
		<img src={image} alt="post" class="m-auto mt-3 rounded-sm border" />
	{/if}
	<p class="mt-6 mb-4 w-106 text-left">{contents}</p>
	<form
		use:enhance
		class="flex w-fit items-center justify-center"
		method="POST"
		action="/home/{page.params.user}?recommend"
	>
		<input hidden name="id" value={id} />
		{#if !recommended}
			<button
				class="mr-2 h-5 w-5 cursor-pointer rounded-[50%] border-2 border-primary"
				title="Recommend"
				type="submit"
			></button>
		{:else}
			<div class="mr-2 h-5 w-5 rounded-[50%] border-2 border-primary bg-primary"></div>
		{/if}
		<p class="text-neutral-400">{recommends} recommendations</p>
	</form>
</div>

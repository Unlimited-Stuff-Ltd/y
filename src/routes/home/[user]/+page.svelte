<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.params.user} - y</title>
</svelte:head>

<p>{page.params.user}</p>

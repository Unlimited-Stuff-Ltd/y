<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Account - y</title>
</svelte:head>

<p>{page.params.user}</p>

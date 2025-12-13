<script lang="ts">
	import { Button } from '$lib/components';

	let { href, text } = $props();
</script>

<Button variant="link" {href} class="ml-5 text-base">{text}</Button>

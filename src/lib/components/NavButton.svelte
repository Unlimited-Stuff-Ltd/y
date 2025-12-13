<script lang="ts">
	import { Button } from '$lib/components';

	let { href, text } = $props();
</script>

<Button variant="link" {href} class="text-base">{text}</Button>

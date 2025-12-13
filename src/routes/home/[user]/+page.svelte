<script lang="ts">
	import { Loading } from '$lib/components';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<p>{data.username}</p>

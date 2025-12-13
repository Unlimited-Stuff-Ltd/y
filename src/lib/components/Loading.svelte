<script lang="ts">
	import y from '$lib/assets/y.svg';
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<img src={y} alt="y logo" class="w-30" />
</div>

<style>
	img {
		animation: pulse 3s infinite;
	}
	@keyframes pulse {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>

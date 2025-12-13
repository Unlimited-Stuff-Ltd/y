<script lang="ts">
	import { Button } from '$lib/components';
    import y from '$lib/assets/y.svg';
</script>

<main class="grid grid-cols-2">
    <div class="flex justify-center items-center w-[50vw] h-screen">
        <img src={y} alt='y logo' class="w-100" />
    </div>
    <div class="flex justify-center items-center w-[50vw] h-screen">
        <div class="text-center">
            <p class="font-black text-4xl">Y. We're better</p><br />
            <Button>Log In</Button>
        </div>
    </div>
</main>
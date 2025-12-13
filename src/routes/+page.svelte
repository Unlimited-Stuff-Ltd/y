<script lang="ts">
	import { Button, Input } from '$lib/components';
    import y from '$lib/assets/y.svg';

    let login = $state(false);

    let username = $state('');
    let password = $state('');
</script>

<main class="grid grid-cols-2">
    <div class="flex justify-center items-center w-[50vw] h-screen">
        <img src={y} alt='y logo' class="w-100" />
    </div>
    <div class="flex justify-center items-center w-[50vw] h-screen">
        <div class="text-center">
            <p class="font-black text-4xl">Y. We're better</p><br />
            {#if !login}
                <Button onclick={() => login = true}>Log In</Button>
            {:else}
                <form>
                    <Input bind:value={username} name='username' type="text" placeholder="Username" />
                    <div class="flex mt-2">
                        <Input bind:value={password} name='password' type='password' placeholder="Password" />
                        <Button type="submit" class="ml-2">Go</Button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</main>
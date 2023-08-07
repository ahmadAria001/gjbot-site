<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	if (browser) document.title = PUBLIC_TITLE;

	page.subscribe((store) => {
		if (!data.isAuth) store.data.authorized = data.isAuth;
	});
</script>

<div class="flex align-middle justify-center">
	<div class="grid grid-cols-5 grid-flow-row text-center">
		<h1 class="col-span-full text-2xl">Welcome to GJBot</h1>
		<p class="col-span-full text-lg">
			Visit <a href="https://kit.svelte.dev" class="text-cyan-400">kit.svelte.dev</a> to read the documentation
		</p>
	</div>
</div>

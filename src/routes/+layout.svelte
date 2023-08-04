<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/navbar.svelte';
	import icon from '$lib/assets/img/Desain_tanpa_judul_(1)-rgm-CYQcv-transformed.png';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { afterNavigate, goto, invalidateAll } from '$app/navigation';
	import { fly } from 'svelte/transition';

	export let data;

	afterNavigate(({ from, to }) => {
		if (from?.url.pathname.startsWith('/auth/discord')) {
			invalidateAll();
			location.reload();
		}
	});

	let uName: string | null;
	let img: string;

	$: browser;
	$: data;

	if (data.username != null) {
		uName = data.username;
		img = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=4096`;
	}
</script>

<div class="layout-container dark:dark-scroll">
	{#if !$page.url.pathname.startsWith('/auth/discord') && browser}
		{#if data.username != null}
			<Navbar gjIcn={img} username={uName} isAuthorized={true} />
		{:else}
			<Navbar gjIcn={icon} username={uName} />
		{/if}
	{/if}
	{#key data.URL}
		<div
			class="main-container mb-5 mt-28 max-md:mt-20 mx-5 max-md:mx-2 dark:dark-scroll"
			in:fly={{ x: -200, duration: 300, delay: 300 }}
			out:fly={{ x: 200, duration: 300 }}
		>
			<slot class="text-white dark:dark-scroll" />
		</div>
	{/key}
</div>

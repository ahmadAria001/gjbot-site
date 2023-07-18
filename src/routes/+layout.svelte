<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/navbar.svelte';
	import icon from '$lib/assets/img/Desain_tanpa_judul_(1)-rgm-CYQcv-transformed.png';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { afterNavigate, invalidateAll } from '$app/navigation';

	export let data;

	afterNavigate(({ from }) => {
		if (from?.url.pathname.startsWith('/auth/discord')) {
			console.log('Triggered');
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

<div class="layout-container">
	{#if !$page.url.pathname.startsWith('/auth/discord') && browser}
		{#if data.username != null}
			<Navbar gjIcn={img} username={uName} isAuthorized={true} />
		{:else}
			<Navbar gjIcn={icon} username={uName} />
		{/if}
	{/if}
	<div class="main-container mb-5 mt-28 max-md:mt-20 mx-5">
		<slot class="text-white" />
	</div>
</div>

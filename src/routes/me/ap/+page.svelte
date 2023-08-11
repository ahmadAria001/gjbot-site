<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) document.title = PUBLIC_TITLE + ' | AP';
	});
</script>

<div class="w-full px-10 max-md:px-0 py-0 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		<h1 class="text-xl col-span-full">Administrator Panel</h1>
		<div class="col-span-full grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
			<div
				class="col-span-full rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none"
			>
				<div
					class="dark:dark-scroll p-5 grid grid-flow-row grid-cols-4 max-lg:grid-cols-1 max-xl:grid-cols-3 gap-5 overflow-auto"
				>
					<a
						href="/me/ap/roles"
						class="col-span-1 flex w-full pr-2 bg-base-200 group/js hover:bg-base-300 dark:hover:bg-slate-700 dark:text-white shadow-lg drop-shadow-lg dark:shadow-none shadow-slate-500 rounded-md"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="icon-tooltip-budges fill-yellow-400 dark:fill-yellow-300 group/js w-1/3 rounded-md"
							><path
								d="M21 6c0-1.654-1.346-3-3-3a2.993 2.993 0 0 0-2.815 2h-6.37A2.993 2.993 0 0 0 6 3C4.346 3 3 4.346 3 6c0 1.302.839 2.401 2 2.815v6.369A2.997 2.997 0 0 0 3 18c0 1.654 1.346 3 3 3a2.993 2.993 0 0 0 2.815-2h6.369a2.994 2.994 0 0 0 2.815 2c1.654 0 3-1.346 3-3a2.997 2.997 0 0 0-2-2.816V8.816A2.996 2.996 0 0 0 21 6zm-3-1a1.001 1.001 0 1 1-1 1c0-.551.448-1 1-1zm-2.815 12h-6.37A2.99 2.99 0 0 0 7 15.184V8.816A2.99 2.99 0 0 0 8.815 7h6.369A2.99 2.99 0 0 0 17 8.815v6.369A2.99 2.99 0 0 0 15.185 17zM6 5a1.001 1.001 0 1 1-1 1c0-.551.448-1 1-1zm0 14a1.001 1.001 0 0 1 0-2 1.001 1.001 0 0 1 0 2zm12 0a1.001 1.001 0 0 1 0-2 1.001 1.001 0 0 1 0 2z"
							/></svg
						>
						<h2 class="card-title h-full flex align-middle">Roles Management</h2>
					</a>
					<a
						href="/me/ap/perms"
						class="col-span-1 flex w-full pr-2 bg-base-200 group/js hover:bg-base-300 dark:hover:bg-slate-700 dark:text-white transition-all duration-150 ease-in shadow-lg drop-shadow-lg dark:shadow-none shadow-slate-500 rounded-md"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="icon-tooltip-budges fill-green-500 dark:fill-green-600 group/js w-1/3 rounded-md"
							><path
								d="M12 4c1.654 0 3 1.346 3 3h2c0-2.757-2.243-5-5-5S7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3zm6.002 16H13v-2.278c.595-.347 1-.985 1-1.722 0-1.103-.897-2-2-2s-2 .897-2 2c0 .736.405 1.375 1 1.722V20H6v-9h12l.002 9z"
							/></svg
						>
						<h2 class="card-title h-full flex align-middle">Permissions Management</h2>
					</a>
					<a
						href="/me/ap/members"
						class="col-span-1 flex w-full pr-2 bg-base-200 group/js hover:bg-base-300 dark:hover:bg-slate-700 dark:text-white transition-all duration-150 ease-in shadow-lg drop-shadow-lg dark:shadow-none shadow-slate-500 rounded-md"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon-tooltip-budges fill-sky-600 dark:fill-sky-500 group/js w-1/3 rounded-md"
							viewBox="0 0 24 24"
							><path
								d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
							/></svg
						>
						<h2 class="card-title h-full flex align-middle">Users Management</h2>
					</a>
					<a
						href="/me/ap/pages"
						class="col-span-1 flex w-full pr-2 bg-base-200 group/js hover:bg-base-300 dark:hover:bg-slate-700 dark:text-white transition-all duration-150 ease-in shadow-lg drop-shadow-lg dark:shadow-none shadow-slate-500 rounded-md"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon-tooltip-budges fill-rose-600 dark:fill-rose-600 group/js w-1/3 rounded-md"
							viewBox="0 0 24 24"
							><path
								d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 2 .001 4H4V5h16zM4 19v-8h16.001l.001 8H4z"
							/><path d="M14 6h2v2h-2zm3 0h2v2h-2z" /></svg
						>
						<h2 class="card-title h-full flex align-middle">Pages Management</h2>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
</style>

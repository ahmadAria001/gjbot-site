<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (browser) document.title = PUBLIC_TITLE + ' | Pages';
	});
</script>

<button
	class="fixed left-2 z-10 top-24 max-md:top-[90%] w-10 h-10 transition-all duration-150 ease-in bg-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 dark:bg-slate-700 px-1 py-1 rounded-full"
	on:click={() => {
		goto('/me/ap');
	}}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-7 fill-slate-700 hover:fill-blue-500 dark:fill-slate-300 dark:hover:fill-emerald-400"
		viewBox="0 0 24 24"
		><path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z" /></svg
	>
</button>
<div class="w-full px-10 max-md:px-0 py-0 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		<div class="col-span-full grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll pt-2">
			<div
				class="col-span-full max-h-[40rem] rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none overflow-auto"
			>
				<div
					class="max-h-[30rem] max-md:max-h-[33rem] dark:dark-scroll p-5 grid grid-flow-row grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-5 overflow-auto"
				>
					{#each data.pageData as { _id, title, path, accessPermissions, updatePermissions, deletePermissions, userPermissions, rolePermissions, disabledUserPermissions, disabledRolePermissions }, idx}
						<button
							class="col-span-1 px-5 p-2 w-full h-fit bg-base-200 shadow-lg drop-shadow-lg dark:shadow-none shadow-slate-500 rounded-md"
							id={_id}
						>
							<h2 class="card-title h-full flex align-middle">
								{title}
							</h2>
							<h2 class="card-title h-full flex align-middle">
								Path: {path}
							</h2>
							<a
								href="/me/ap/pages/{_id}"
								class="mt-2 w-full rounded-md right-2 p-2 flex justify-center align-middle z-10 transition-all duration-150 ease-in bg-yellow-500 dark:bg-yellow-600 px-1 py-1 pt-2 max-md:pt-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="max-md:w-7 w-8 fill-white"
									><path
										d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"
									/><path
										d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
									/></svg
								>
							</a>
						</button>
					{/each}
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

<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) document.title = PUBLIC_TITLE + ' | Members';
	});
</script>

<div class="w-full px-10 max-md:px-0 py-0 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		<div class="col-span-full grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
			<div
				class="col-span-full rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none"
			>
				<span>x</span>
			</div>
		</div>
	</div>
</div>

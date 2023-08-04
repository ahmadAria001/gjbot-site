<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let parameters;
	let token, type, expire;

	onMount(() => {
		if (browser) {
			parameters = new URLSearchParams(window.location.hash.slice(1));
			[token, type, expire] = [
				parameters.get('access_token'),
				parameters.get('token_type'),
				Number.parseInt(parameters.get('expires_in')?.toString()!)
			];

			fetch('/api/controller/auth', {
				method: 'POST',
				body: JSON.stringify({ type, token, expire })
			})
				.then((result) => result.json())
				.then((val) => {
					let { isErr, errMsg, content, isNew } = val;

					if (isErr) {
						document.getElementById('tooltip-not-member')?.classList.toggle('hidden');

						setTimeout(() => {
							document.getElementById('tooltip-not-member')?.classList.toggle('hidden');
							console.error(errMsg);
							history.replaceState('', '', '/auth');
							goto('/');
							return;
						}, 10000);
					} else {
						fetch('/api/controller/session', { method: 'POST', body: content })
							.then((res) => res.json())
							.then((val) => {
								if (!isNew) {
									history.replaceState('', '', '/auth');
									goto('/');
									return;
								} else {
									history.replaceState('', '', '/auth');
									goto('/auth');
									return;
								}
							});
					}
				});
		}
	});
</script>

<div
	class="alert alert-error py-1 rounded-lg dark:text-white dark:bg-rose-600 hidden"
	id="tooltip-not-member"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="stroke-current shrink-0 h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
		/></svg
	>
	<span>Not Part of The Guild, Redirecting to Home</span>
</div>
<div class="flex align-middle justify-center w-full">
	<div
		class="w-4/12 h-fit grid grid-rows-6 grid-cols-6 max-md:w-full max-lg:w-2/3 bg-white dark:bg-slate-800 dark:text-white p-5 text-center shadow-md shadow-gray-500 dark:shadow-2xl dark:shadow-emerald-500 drop-shadow-2xl rounded-md dark:border-emerald-500 border-solid border-2"
	>
		<div class="flex justify-center align-middle col-span-full row-span-full text-2xl">
			<h1 class="text-blue-500 dark:text-emerald-500 mr-1">Redirecting</h1>
			<span class="loading loading-dots loading-lg text-blue-500 dark:text-emerald-500" />
		</div>
	</div>
</div>

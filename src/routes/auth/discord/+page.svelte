<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let parameters;
	let token, type, expire;

	if (browser) {
		parameters = new URLSearchParams(window.location.hash.slice(1));
		[token, type, expire] = [
			parameters.get('access_token'),
			parameters.get('token_type'),
			Number.parseInt(parameters.get('expires_in')?.toString()!)
		];

		// console.log(token);
		// console.log(type);
		// console.log(new Date(Date.now() + expire).toLocaleString());

		fetch('/api/controller/auth', {
			method: 'POST',
			body: JSON.stringify({ type, token, expire })
		})
			.then((result) => result.json())
			.then((val) => {
				let { isErr, errMsg, content } = val;

				if (isErr) {
					console.error(errMsg);
					history.replaceState('', '', '/auth');
					goto('/');
					return;
				}

				fetch('/api/controller/session', { method: 'POST', body: content })
					.then((res) => res.json())
					.then((val) => {
						console.log(val.message);
						history.replaceState('', '', '/auth');
						goto('/');
						return;
					});
			});
	}
</script>

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

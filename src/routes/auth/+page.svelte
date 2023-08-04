<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;
	export let form;

	let passwordInput: any;
	let passwordConfirm: any;

	let submitEn = {
		whitespace: false,
		symbols: false,
		length: false,
		confirmed: false
	};

	$: passwordInput, passwordConfirm;
	$: form;

	onMount(() => {
		if (form?.updated) {
			history.replaceState('', '', '/');
			goto('/');
			location.reload();
		}
	});

	const handlePassword = (enabled: boolean) => {
		let tooltip = document.getElementById('tooltip-confirm-pw');

		if (enabled) {
			if (tooltip?.classList.contains('hidden')) {
				tooltip?.classList.remove('hidden');
			}

			submitEn.confirmed = false;
		}

		if (!enabled) {
			if (!tooltip?.classList.contains('hidden')) {
				tooltip?.classList.add('hidden');
			}

			submitEn.confirmed = true;
		}

		if (JSON.stringify(submitEn).includes('false')) {
			disableSumbit(true);
		}
		if (!JSON.stringify(submitEn).includes('false')) {
			disableSumbit(false);
		}

		return;
	};

	const disableSumbit = (enabled: boolean) => {
		let submit = <HTMLInputElement>document.getElementById('submit');
		if (enabled) {
			submit.disabled = true;
		}
		if (!enabled) {
			submit.disabled = false;
		}
	};

	if (browser) document.title = PUBLIC_TITLE + ' | Sign In';
</script>

<div class="container-alert absolute top-20 left-0 xl:left-4 xl:top-24 z-[50]">
	<div
		class="alert alert-error flex py-1 rounded-lg dark:text-white dark:bg-rose-600"
		id="tooltip-length-pw"
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
		<span>Password must be more than 10 Character</span>
	</div>
	<div
		class="alert alert-error mt-2 flex py-1 rounded-lg dark:text-white dark:bg-rose-600"
		id="tooltip-regex-pw"
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
		<span>Password must contains symbols</span>
	</div>
	<div
		class="alert alert-error flex mt-2 py-1 rounded-lg dark:text-white dark:bg-rose-600"
		id="tooltip-space-pw"
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
		<span>Password cannot contains space</span>
	</div>
	<div
		class="alert alert-error mt-2 flex py-1 rounded-lg dark:text-white dark:bg-rose-600"
		id="tooltip-confirm-pw"
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
		<span>Password is not Match</span>
	</div>
</div>
<div class="w-full p-2 flex justify-center align-middle">
	<div
		class="w-4/12 h-fit max-md:w-full max-lg:w-2/3 max-xl:w-1/2 bg-white dark:bg-slate-800 dark:text-white p-5 text-center shadow-md shadow-gray-500 dark:shadow-2xl dark:shadow-emerald-500 drop-shadow-2xl rounded-md dark:border-emerald-500 border-solid border-2"
	>
		<div class="grid grid-cols-5 grid-flow-row text-black dark:text-white">
			<div class="img-wrapper col-span-full flex justify-center">
				<img
					src="https://cdn.discordapp.com/avatars/{data.id}/{data.avatar}.png?size=4096"
					alt="gjIcon"
					class="w-32 rounded-full"
				/>
			</div>
			<h1 class="col-span-full text-2xl font-bold font-[Quicksand]">Welcome</h1>
			<h1 class="col-span-full text-xl font-[Quicksand]">{data.username}</h1>
			<div class="divider col-span-full px-16 max-md:px-2 max-lg:px-2 text-slate-400" />

			<form
				method="post"
				action="auth/"
				class="grid grid-cols-2 grid-flow-row col-span-full max-md:px-2 max-lg:px-2 max-xl:px-5 px-16 mt-5 relative"
			>
				<label class="relative col-span-full row-span-2 gap-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
					>
						<path
							d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z"
						/>
					</svg>
					<input
						type="password"
						name="password"
						id="password"
						required
						bind:value={passwordInput}
						on:input={() => {
							let pw = document.getElementById('tooltip-length-pw');
							let regexTooltip = document.getElementById('tooltip-regex-pw');
							let whitespaceTooltip = document.getElementById('tooltip-space-pw');

							let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
							let formatWhiteSpace = /[ ]/;

							if (
								whitespaceTooltip?.classList.contains('hidden') &&
								formatWhiteSpace.test(passwordInput)
							) {
								submitEn.whitespace = false;
								whitespaceTooltip?.classList.remove('hidden');
							}
							if (
								!whitespaceTooltip?.classList.contains('hidden') &&
								!formatWhiteSpace.test(passwordInput)
							) {
								submitEn.whitespace = true;
								whitespaceTooltip?.classList.add('hidden');
							}
							if (
								regexTooltip?.classList.contains('hidden') &&
								!format.test(passwordInput.toString())
							) {
								regexTooltip?.classList.remove('hidden');
								submitEn.symbols = false;
							}

							if (
								!regexTooltip?.classList.contains('hidden') &&
								format.test(passwordInput.toString())
							) {
								regexTooltip?.classList.add('hidden');
								submitEn.symbols = true;
							}

							if (!pw?.classList.contains('hidden') && passwordInput.length >= 10) {
								pw?.classList.add('hidden');
								submitEn.length = true;
							}

							if (pw?.classList.contains('hidden') && passwordInput.length < 10) {
								pw?.classList.remove('hidden');
								submitEn.length = false;
							}

							if (passwordInput == passwordConfirm) {
								handlePassword(false);
							} else {
								handlePassword(true);
							}
						}}
						placeholder="Set Your Password"
						class="pr-2 font-[Quicksand] w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
					/>
				</label>
				<label class="relative col-span-full row-span-2 gap-0 mt-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
						><path
							d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
						/><path
							d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"
						/></svg
					>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						required
						placeholder="Confirm Password"
						bind:value={passwordConfirm}
						on:input={() => {
							if (passwordInput == passwordConfirm) {
								handlePassword(false);
							} else {
								handlePassword(true);
							}
						}}
						class="pr-2 font-[Quicksand] w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
					/>
				</label>

				<button
					class="col-span-full mt-5 mb-2 text-white transition-all duration-150
					 bg-blue-600 dark:hover:bg-emerald-500 dark:hover:text-white
					 dark:bg-transparent dark:border-solid dark:border-2 dark:text-emerald-400
					  dark:border-emerald-400 dark:hover:shadow-emerald-400 dark:shadow-lg
					   dark:drop-shadow-md h-10 rounded-md font-[Roboto] font-extrabold
					   disabled:bg-transparent disabled:hover:bg-transparent disabled:text-emerald-800 disabled:hover:text-gray-600"
					id="submit"
					disabled
				>
					Sing In
				</button>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
</style>

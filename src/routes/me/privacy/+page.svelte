<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;
	export let form;

	let passwordInput: any;
	let passwordConfirm: any;
	let passwordCurrent: any;

	let submitEn = {
		whitespace: false,
		symbols: false,
		length: false,
		confirmed: false
	};

	$: passwordInput, passwordConfirm;
	$: form;

	console.log(form);

	onMount(() => {
		if (form?.status == 200) {
			history.replaceState('', '', '/me');

			let currentTool = document.getElementById('tooltip-current-pw-sc');
			currentTool?.classList.remove('hidden');
			setTimeout(() => {
				currentTool?.classList.add('hidden');
			}, 10000);
		}

		if (form?.status == 400) {
			let currentTool = document.getElementById('tooltip-current-pw');
			currentTool?.classList.remove('hidden');
			setTimeout(() => {
				currentTool?.classList.add('hidden');
			}, 10000);
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

<div class="container-alert absolute top-20 right-0 xl:right-4 xl:top-24 z-[50]">
	<div
		class="alert alert-success py-1 rounded-lg dark:text-white dark:bg-emerald-600 mb-2 hidden"
		id="tooltip-current-pw-sc"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="fill-current shrink-0 h-6 w-6"
			><path
				d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
			/><path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" /></svg
		>
		<span>Password has been changed</span>
	</div>
	<div
		class="alert alert-error py-1 rounded-lg dark:text-white dark:bg-rose-600 mb-2 hidden"
		id="tooltip-current-pw"
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
		<span>Current password is incorrect</span>
	</div>
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
		class="w-3/4 h-fit max-md:w-full max-lg:w-2/3 max-xl:w-1/2 bg-white dark:bg-slate-800 dark:text-white p-5 text-center shadow-md shadow-gray-500 dark:shadow-2xl dark:shadow-emerald-500 drop-shadow-2xl rounded-md dark:border-emerald-500 border-solid border-2"
	>
		<div class="grid grid-cols-5 grid-flow-row text-black dark:text-white relative">
			<div
				class="img-wrapper col-span-full flex justify-center absolute top-12 right-28 max-2xl:top-10 max-2xl:right-16 max-xl:hidden"
			>
				<img
					src="https://cdn.discordapp.com/avatars/{data.id}/{data.avatar}.png?size=4096"
					alt="gjIcon"
					class="w-72 rounded-full"
				/>
			</div>
			<form
				method="post"
				action="/me/privacy"
				class="grid grid-cols-2 grid-flow-row gap-5 col-span-full max-md:px-2 max-lg:px-2 max-xl:px-5 px-16 mt-5 relative"
			>
				<span class="col-span-full text-left font-[Quicksand] font-bold">Current Password</span>
				<label
					class="relative col-span-full w-6/12 max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
						><path
							d="M3.433 17.325 3.079 19.8a1 1 0 0 0 1.131 1.131l2.475-.354C7.06 20.524 8 18 8 18s.472.405.665.466c.412.13.813-.274.948-.684L10 16.01s.577.292.786.335c.266.055.524-.109.707-.293a.988.988 0 0 0 .241-.391L12 14.01s.675.187.906.214c.263.03.519-.104.707-.293l1.138-1.137a5.502 5.502 0 0 0 5.581-1.338 5.507 5.507 0 0 0 0-7.778 5.507 5.507 0 0 0-7.778 0 5.5 5.5 0 0 0-1.338 5.581l-7.501 7.5a.994.994 0 0 0-.282.566zM18.504 5.506a2.919 2.919 0 0 1 0 4.122l-4.122-4.122a2.919 2.919 0 0 1 4.122 0z"
						/></svg
					>
					<input
						type="password"
						name="currentPassword"
						id="currentPassword"
						required
						placeholder="Current Password"
						bind:value={passwordCurrent}
						class="pr-2 font-[Quicksand] w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
					/>
				</label>
				<span class="col-span-full text-left font-[Quicksand] font-bold"
					>New Password <p class="text-left text-sm max-w-sm font-[Quicksand] font-light">
						new password must containt 1 letter, 1 number and 1 symbol. minimum lettter length is 12
						character
					</p></span
				>
				<!-- <span class="col-span-full " /> -->
				<label
					class="relative col-span-full w-6/12 max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
				>
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
				<span class="col-span-full text-left font-[Quicksand] font-bold">Confirm Password</span>
				<label
					class="relative col-span-full w-6/12 max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
				>
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

				<div class="col-span-full flex justify-end">
					<button
						class="mt-5 mb-2 text-white w-fit max-md:w-full px-10 transition-all duration-150
                         bg-blue-600 hover:bg-blue-500 dark:hover:bg-emerald-500 dark:hover:text-white
                         dark:bg-transparent dark:border-solid dark:border-2 dark:text-emerald-400
                          dark:border-emerald-400 dark:hover:shadow-emerald-400 dark:shadow-lg
                           dark:drop-shadow-md h-10 rounded-xl font-[Roboto] font-extrabold
                           disabled:bg-transparent disabled:hover:bg-transparent disabled:text-emerald-800 disabled:hover:text-gray-600"
						id="submit"
						disabled
					>
						Confirm
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
</style>

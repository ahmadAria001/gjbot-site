<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_DC_SIGNIN_LINK, PUBLIC_TITLE } from '$env/static/public';
	import gjIcon from '$lib/assets/img/Desain_tanpa_judul_(1)-rgm-CYQcv-transformed.png';
	import postcss from 'postcss';
	import { onMount } from 'svelte';

	export let form;

	afterNavigate(({ from, to }) => {
		if (to?.url.search.startsWith('?/signout') && form?.signedOut == true) {
			invalidateAll();
			location.reload();
			form.signedOut = false;
		}
	});

	onMount(() => {
		let modal = document.getElementById('modal-log');

		if (form?.signedIn) {
			history.replaceState('', '', '/');
			goto('/');
			location.reload();
		}

		if (form?.message != null) {
			// @ts-ignore
			modal?.showModal();
		}

		if (browser) document.title = PUBLIC_TITLE + ' | Sign In';
	});
</script>

<dialog id="modal-log" class="modal border-0 border-transparent">
	<form method="dialog" class="modal-box border-transparent">
		<h3 class="font-bold text-lg">Error</h3>
		<p class="py-4">{form?.message != null ? form?.message : ''}</p>
	</form>
	<form method="dialog" class="modal-backdrop border-transparent">
		<button>close</button>
	</form>
</dialog>
<div class="w-full p-2 flex justify-center align-middle dark:dark-scroll">
	<div
		class="w-4/12 h-fit max-md:w-full max-lg:w-2/3 bg-white dark:bg-slate-800 dark:text-white p-5 text-center shadow-md shadow-gray-500 dark:shadow-2xl dark:shadow-emerald-500 drop-shadow-2xl rounded-md dark:border-emerald-500 border-solid border-2"
	>
		<div class="grid grid-cols-5 grid-flow-row text-black dark:text-white">
			<div class="img-wrapper col-span-full flex justify-center">
				<img src={gjIcon} alt="gjIcon" class="w-20" />
			</div>
			<h1 class="col-span-full text-2xl font-bold font-[Quicksand]">Welcome</h1>
			<h1 class="col-span-full text-md font-[Quicksand]">Hey, Please enter Your Details</h1>

			<form
				method="post"
				action="signin?/signin"
				class="grid grid-cols-2 grid-flow-row col-span-full max-md:px-2 max-lg:px-2 px-16 mt-10"
			>
				<label class="relative col-span-full row-span-2 gap-0">
					<span
						class="absolute left-2 top-0 pt-[0.35rem] pr-2 w-fit text-left p-1 text-slate-400"
						style="font-family: 'Supermercado One', cursive;">@</span
					>
					<input
						type="email"
						name="email"
						id="email"
						required
						placeholder="Username"
						class="pr-2 font-[Quicksand] w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
					/>
				</label>
				<label class="relative col-span-full row-span-2 gap-0 mt-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
						><path
							d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z"
						/></svg
					>
					<input
						type="password"
						name="password"
						id="password"
						required
						placeholder="Password"
						class="pr-2 font-[Quicksand] w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
					/>
				</label>
				<a
					href=""
					class="col-span-full text-left pl-1 mt-2 mb-2 text-sm text-[#0066FF] dark:text-emerald-400"
					>Forgot Password?</a
				>
				<div class="flex col-span-full pl-1 align-middle">
					<input
						name="remember"
						id="remember"
						type="checkbox"
						class="h-full w-4 rounded-sm border-slate-500 accent-[#0066FF] bg-transparent dark:bg-transparent dark:border-emerald-700 dark:checked:accent-emerald-400 border-solid border-[2.2px]"
					/>
					<span class="ml-2 h-full w-fit text-sm text-slate-400">Rember Me</span>
				</div>

				<button
					class="col-span-full mt-5 mb-2 text-white transition-all duration-150 bg-blue-600 dark:hover:bg-emerald-500 dark:hover:text-white dark:bg-transparent dark:border-solid dark:border-2 dark:text-emerald-400 dark:border-emerald-400 dark:hover:shadow-emerald-400 dark:shadow-lg dark:drop-shadow-md h-10 rounded-md font-[Roboto] font-extrabold"
				>
					Sing In
				</button>

				<span class="flex col-span-full justify-center max-md:block">
					<span class="text-sm max-md:text-[0.7rem]"> Don’t have an account? </span>
					<br class="max-md:visible invisible" />
					<a href="" class="text-blue-600 ml-1 dark:text-emerald-400 text-sm max-md:text-[0.7rem]">
						Sign up with Discord
					</a>
				</span>
			</form>
			<div class="divider col-span-full px-16 max-md:px-2 max-lg:px-2 text-slate-400">OR</div>
			<a
				href={PUBLIC_DC_SIGNIN_LINK}
				class="col-span-full h-9 flex align-middle justify-center pt-1 rounded-md mx-16 max-md:mx-2 max-lg:mx-2 bg-blue-800 border-blue-800 hover:bg-blue-800 text-blue-700 dark:border-blue-600 dark:bg-transparent dark:hover:bg-blue-600 border-solid border-2 group dark:hover:shadow-blue-500 dark:shadow-lg dark:drop-shadow-md"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-7 transition-all duration-150 group-hover:fill-white mr-6 max-md:mr-1 fill-white dark:stroke-blue-500 dark:fill-none max-md:h5"
					><path
						d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
					/></svg
				>
				<span
					class="transition-all duration-150 text-white dark:text-blue-500 group-hover:text-white max-md:text-md"
				>
					Discord
				</span>
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
</style>

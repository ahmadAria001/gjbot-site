<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { PUBLIC_TITLE } from '$env/static/public';
	import gjIcon from '$lib/assets/img/Desain_tanpa_judul_(1)-rgm-CYQcv-transformed.png';
	import { formatCode } from '$lib/functions/codeFormatter';
	import { afterUpdate, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { SubmitFunction } from './$types.js';
	import { afterNavigate } from '$app/navigation';

	export let data;
	export let form;

	let loadingState = false;

	let formattedText: any[] = [];

	function pushToFormat(content: string, sender: 'user' | 'system', created_at: number) {
		displayData.push(formatterOne(content, sender, created_at));
		page.subscribe((val) => (val.form = null));

		displayData = displayData;

		setTimeout(() => {
			scrollToBottom();
		}, 1000);

		setTimeout(() => {
			loadingState = false;
		}, 10000);
	}

	function setErr() {
		toggleHidden('tooltip-iserr', true);

		Promise.resolve(
			setTimeout(() => {
				toggleHidden('tooltip-iserr', false);
			}, 5000)
		);

		loadingState = false;
		page.subscribe((val) => (val.form != null ? (val.form.isErr = false) : (val.form = null)));
		return $page.form.message;
	}

	const onSubmit = () => {
		loadingState = true;
	};

	$: $page;
	$: form;
	$: data;
	$: formattedText;
	$: pushToFormat;
	$: displayData = formattedText;
	$: err =
		(new Object($page.form).hasOwnProperty('isErr') && $page.form != null && $page.form.isErr) ||
		(new Object($page.form).hasOwnProperty('isErr') && $page.form.isErr != null && $page.form.isErr)
			? setErr()
			: null;

	$: (form != undefined &&
		new Object(form).hasOwnProperty('promptData') &&
		form.promptData != null) ||
	(form != null && new Object(form).hasOwnProperty('promptData') && form.promptData != null)
		? pushToFormat(form.promptData.content, form.promptData.sender, form.promptData.created_at)
		: (form = null);

	afterUpdate(() => {
		if (form?.isErr) {
			toggleHidden('tooltip-iserr', true);
			setTimeout(() => {
				toggleHidden('tooltip-iserr', false);
			}, 5000);
			return;
		}
	});

	let formatter = (datas: any) => {
		let formatted: any[] = [];

		if (datas.conv != null || datas.conv != undefined) {
			datas.conv.map((val: any) => {
				formatted.push(formatCode(val.content, val.sender, val.created_at));
			});
		}

		return formatted;
	};
	let formatterOne = (content: string, sender: 'user' | 'system', created_at: number) => {
		if (form?.message == 'Exceed Token Limit') {
			toggleHidden('tooltip-iserr', true);
			setTimeout(() => {
				toggleHidden('tooltip-iserr', false);
			}, 5000);
			return;
		}

		return formatCode(content, sender, created_at);
	};

	formattedText = formatter(data);

	// console.log($page.form);

	let textareaContent = '';

	let textareaRef: HTMLTextAreaElement;
	let submitBtn: HTMLButtonElement;

	function adjustTextareaHeight() {
		textareaRef.style.height = 'auto';
		textareaRef.style.height = `${Math.min(textareaRef.scrollHeight, 70)}px`;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.code === 'Backspace') {
			adjustTextareaHeight();
		}
	}

	function toggleHidden(target: string, visible: boolean) {
		let element = document.getElementById(target);
		if (!visible) {
			element?.classList.toggle('scale-x-0');
			element?.classList.toggle('scale-x-100');
		}
		if (visible) {
			element?.classList.toggle('scale-x-100');
			element?.classList.toggle('scale-x-0');
		}
	}

	onMount(adjustTextareaHeight);

	let parsedParts: any = [];
	$: parsedParts;

	function createHTMLFromString(htmlString: string): HTMLElement {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlString;
		return tempDiv.firstElementChild as HTMLElement;
	}

	// console.table(formattedText);
	let scrollToBottom = () => {
		window.scrollTo({ behavior: 'smooth', top: document.body.offsetHeight });
	};

	onMount(() => {
		scrollToBottom();
		addEventListener('keydown', async (event: KeyboardEvent) => {
			if (event.code === 'Escape') scrollToBottom();
		});
	});

	afterNavigate(() => {
		scrollToBottom();
	});

	if (browser) document.title = PUBLIC_TITLE + ' | Conversation';
</script>

<div
	class="alert alert-error fixed top-20 left-0 xl:left-4 xl:top-24 z-[50] py-1 rounded-lg dark:text-white dark:bg-rose-600 w-fit transition-all duration-200 origin-left ease-in scale-x-0 scale-y-100"
	id="tooltip-iserr"
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
	<span>
		{#if err != null || err != undefined}
			{err}
		{:else}
			<span>...</span>
		{/if}
	</span>
</div>
<form
	use:enhance
	method="POST"
	action="conversations?/submitpromp"
	on:submit={() => {
		let formatResult = formatterOne(textareaContent, 'user', Date.now());
		onSubmit();
		setTimeout(() => {
			if (formatResult != undefined || formatResult != null) formattedText.push(formatResult);
		}, 1000);
	}}
>
	<div class="w-full px-10 max-md:px-0 py-2 flex justify-center dark:dark-scroll pb-14">
		<div
			class="grid grid-flow-row grid-cols-4 w-full gap-5 max-md:gap-2 dark:dark-scroll px-10 max-md:px-2"
		>
			<div class="flex align-middle justify-center col-span-full">
				<div class="container w-fit">
					<img src={gjIcon} alt="welcomImg" class="w-28 ml-10" />
					<h2 class="text-xl max-md:text-lg font-bold font-[Quicksand]">Welcome to GJ Bot AI</h2>
				</div>
			</div>
			<div class="divider col-span-full" />
			<main class="message-content pb-5 pt-5 max-md:pt-0 col-span-full w-full">
				{#if displayData != null || displayData != undefined}
					<!-- {@debug displayData} -->
					{#each displayData as { content, instance, created_at }, index}
						{#if instance == 'user'}
							<div
								class="flex relative justify-end mt-5 dark-scroll"
								in:fly={{ y: -200, duration: 300, delay: 300 }}
								out:fly={{ y: 200, duration: 300 }}
							>
								{#await content}
									<span> Loading... </span>
								{:then val}
									<span
										class="rounded-md bg-slate-600 dark:bg-emerald-700 text-white px-5 py-2 w-fit max-w-[70%] max-md:max-w-full overflow-auto dark:dark-scroll text-right"
									>
										{@html val != null ? val.join('') : '<span>...</span>'}
										<br />
										<span class="text-sm text-right text-gray-300">
											{new Date(created_at).toLocaleDateString()}
										</span>
									</span>
								{/await}
							</div>
						{:else}
							{#await content}
								<span> Loading... </span>
							{:then val}
								<div
									class="flex justify-start mt-5 dark-scroll"
									in:fly={{ y: -200, duration: 300, delay: 300 }}
									out:fly={{ y: 200, duration: 300 }}
								>
									<span
										class="rounded-md bg-[#fcfcfc] dark:bg-slate-700 text-black px-5 py-2 w-fit max-w-[70%] max-md:max-w-full overflow-auto dark:slate-scroll shadow-md shadow-slate-500 dark:shadow-none drop-shadow-md dark:text-white"
									>
										{#if Array.isArray(val) == true}
											{@html val.join('')}
										{:else}
											{@html val}
										{/if}
									</span>
								</div>
							{/await}
						{/if}
					{/each}
				{/if}
			</main>
		</div>
	</div>
	<div class="fixed bottom-11 left-0 w-full max-md:w-11/12 max-h-10">
		<div
			class="relative stretch w-full mx-2 flex flex-row align-bottom justify-between gap-x-2 px-2 pt-1 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl h-fit border-2 border-slate-400 border-solid dark:border-emerald-500 shadow-md shadow-slate-500 bg-white dark:bg-[#1d232a] dark:shadow-none drop-shadow-md rounded-xl"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="w-8 flex align-middle text-center fill-slate-400"
				><circle cx="9.5" cy="9.5" r="1.5" /><circle cx="14.5" cy="9.5" r="1.5" /><path
					d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.515 5 6.934V22l5.34-4.004C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.671 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z"
				/></svg
			>
			<textarea
				name="prompt"
				id="prompt"
				required
				rows="1"
				disabled={loadingState}
				class="mb-[0.15rem] w-full resize-none overflow-auto dark:dark-scroll max-h-[5rem] bg-transparent outline-none focus:border-transparent focus:border-solid focus:border-2 placeholder:text-slate-400 dark:text-white py-1"
				placeholder="I know you're up to something"
				bind:this={textareaRef}
				bind:value={textareaContent}
				on:input={adjustTextareaHeight}
				on:keydown={handleKeyDown}
			/>
			<span
				class="loading loading-spinner loading-lg ml-2 mr-2 text-blue-500 dark:text-emerald-500 transition-all ease-in duration-200 scale-0 {loadingState
					? 'scale-100'
					: 'scale-0'}"
			/>
			<button
				class="w-fit group/submit disabled:hidden"
				disabled={loadingState}
				bind:this={submitBtn}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-full w-8 flex align-middle text-center dark:fill-slate-400 p-1 transition-all ease-linear duration-200 dark:group-hover/submit:fill-emerald-500"
					><path
						d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"
					/></svg
				>
			</button>
		</div>
	</div>
</form>

<button
	class="fixed bottom-11 right-10 max-md:bottom-24 max-md:right-5"
	on:click={() => {
		window.scrollTo({ behavior: 'smooth', top: document.body.offsetHeight });
	}}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="w-10 flex align-middle text-center fill-blue-600 dark:fill-emerald-600"
		><path
			d="M12 1.993C6.486 1.994 2 6.48 2 11.994c0 5.513 4.486 9.999 10 10 5.514 0 10-4.486 10-10s-4.485-10-10-10.001zm0 18.001c-4.411-.001-8-3.59-8-8 0-4.411 3.589-8 8-8.001 4.411.001 8 3.59 8 8.001s-3.589 8-8 8z"
		/><path d="M13 8h-2v4H7.991l4.005 4.005L16 12h-3z" /></svg
	>
</button>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
</style>

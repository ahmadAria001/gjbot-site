<script lang="ts">
	import gjI from '$lib/assets/img/Desain_tanpa_judul_(1)-rgm-CYQcv-transformed.png';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (data.banner == null) document.getElementById('user-banner')?.classList.toggle('hidden');
	});
</script>

<div class="w-full px-10 max-md:px-0 py-0 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		<h1 class="text-xl col-span-full">Account Settings</h1>
		<div
			class="col-span-full grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none"
		>
			<div
				class="col-span-full w-full flex justify-center align-middle dark:bg-[#1e293b] rounded-lg px-5 py-10"
			>
				<div
					class="profile-container w-[95%] max-md:w-[95%] flex justify-center align-middle bg-[#f6f5f5] dark:bg-transparent rounded-md shadow-sm drop-shadow-sm shadow-slate-700 pb-10"
				>
					<div class="col-span-full ctn w-full relative rounded-lg">
						{#if data.banner == null}
							{#if data.bannerColor == null}
								<div
									class="banner w-full h-40 max-md:h-20 bg-[#c7eeff] dark:bg-[#059669] rounded-t-lg"
								/>
							{:else}
								<div
									class="banner w-full h-40 max-md:h-20 bg-[{data.bannerColor.toString()}] dark:bg-[{data.bannerColor.toString()}] rounded-t-lg"
								/>
							{/if}
						{:else}
							<img
								src={data.banner}
								id="user-banner"
								alt="user-banner"
								class="banner w-full h-40 max-md:h-20 bg-[#c7eeff] dark:bg-[#059669] rounded-t-lg"
							/>
						{/if}
						<img
							src={data.profilePict}
							alt="profile-pict"
							class="absolute z-10 left-5 max-sm:left-1 top-24 max-sm:top-12 rounded-full bg-[#1d242b] w-[7rem] max-md:w-[8rem] max-sm:w-[4rem]"
						/>

						<div
							class="w-full max-md:order-2 text-left pl-36 max-md:pl-0 max-lg:pl-10 mt-5 max-md:mt-8 max-md:block flex dark:text-white"
						>
							<div class="w-2/6 max-md:w-full max-md:px-3 max-md:mt-8">
								<h3 class="text-xl max-md:text-md max-sm:text-sm w-full">{data.username}</h3>
								<h3 class="text-lg max-md:text-sm max-sm:text-sm w-full">{data.email}</h3>
							</div>
							<div
								class="w-4/6 max-md:w-full text-right h-fit flex justify-end max-md:justify-center max-md:mt-2 px-1 pt-0 relative"
							>
								<div
									class="flex justify-end right-2 max-xl:grid max-xl:grid-cols-8 gap-1 w-fit rounded-md bg-[#e0e0e0] dark:bg-slate-700 px-1 py-1"
								>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-yellow-400 group/js"
											viewBox="0 0 24 24"
											><path
												d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"
											/></svg
										>

										<span class="tooltip-budges group-hover/js:scale-y-100">
											Javascript Master
										</span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-orange-500 dark:fill-blue-400"
											viewBox="0 0 24 24"
											><path
												d="M9.37 17.51c-3.09.86 1.87 2.64 5.8 1a7.18 7.18 0 0 1-1.1-.54 11.59 11.59 0 0 1-4.16.18c-1.31-.15-.54-.64-.54-.64zm5.33-1.68a16.27 16.27 0 0 1-5.36.26c-1.31-.14-.45-.77-.45-.77-3.4 1.12 1.89 2.4 6.64 1a2.25 2.25 0 0 1-.83-.49zm1.82-9.73s-6.87 1.71-3.59 5.49a1.47 1.47 0 0 1-.25 2.12s2.46-1.27 1.33-2.86-1.86-2.22 2.51-4.75z"
											/><path
												d="M18.13 19.14s.56.46-.63.82c-2.27.69-9.43.9-11.42 0-.72-.31.62-.74 1-.83a2.54 2.54 0 0 1 .69-.08c-.8-.56-5.15 1.1-2.21 1.58 8.05 1.37 14.64-.56 12.57-1.49zm-2.76-4.88a7 7 0 0 1 .92-.49s-1.51.27-3 .4a28.11 28.11 0 0 1-4.82.05C6.09 13.91 9.74 13 9.74 13a6.81 6.81 0 0 0-3.16.75c-2.06 1.03 5.09 1.48 8.79.51zm.91 2.44a.39.39 0 0 1-.08.09c5-1.32 3.18-4.65.78-3.81a.71.71 0 0 0-.33.25s.14-.05.43-.12c1.22-.25 2.92 1.63-.8 3.59zM12 13c-.74-1.67-3.26-3.14 0-5.71C16.09 4.08 14 2 14 2c.84 3.31-3 4.31-4.34 6.37-.93 1.41.47 2.92 2.34 4.63z"
											/><path
												d="M16.41 21.32a29.75 29.75 0 0 1-9.14.14s.46.38 2.84.53c3.61.23 9.15-.12 9.29-1.83 0 0-.26.64-2.99 1.16z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> Java Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-blue-500"
											viewBox="0 0 24 24"
											><path
												d="M18.5 9.51a4.22 4.22 0 0 1-1.91-1.34A5.77 5.77 0 0 0 12 6a4.72 4.72 0 0 0-5 4 3.23 3.23 0 0 1 3.5-1.49 4.32 4.32 0 0 1 1.91 1.35A5.77 5.77 0 0 0 17 12a4.72 4.72 0 0 0 5-4 3.2 3.2 0 0 1-3.5 1.51zm-13 4.98a4.22 4.22 0 0 1 1.91 1.34A5.77 5.77 0 0 0 12 18a4.72 4.72 0 0 0 5-4 3.23 3.23 0 0 1-3.5 1.49 4.32 4.32 0 0 1-1.91-1.35A5.8 5.8 0 0 0 7 12a4.72 4.72 0 0 0-5 4 3.2 3.2 0 0 1 3.5-1.51z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> Tailwind Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-green-500"
											viewBox="0 0 24 24"
											><path
												d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.182-.277-.072-.314.496-.165.588-.201 1.101-.493.056-.037.129-.02.185.017l1.87 1.12c.074.036.166.036.221 0l7.319-4.237c.074-.036.11-.11.11-.202V7.768c0-.091-.036-.165-.11-.201l-7.319-4.219c-.073-.037-.165-.037-.221 0L4.552 7.566c-.073.036-.11.129-.11.201v8.457c0 .073.037.166.11.202l2 1.157c1.082.548 1.762-.095 1.762-.735V8.502c0-.11.091-.221.22-.221h.936c.108 0 .22.092.22.221v8.347c0 1.449-.788 2.294-2.164 2.294-.422 0-.752 0-1.688-.46l-1.925-1.099a1.55 1.55 0 0 1-.771-1.34V7.786c0-.55.293-1.064.771-1.339l7.316-4.237a1.637 1.637 0 0 1 1.544 0l7.317 4.237c.479.274.771.789.771 1.339v8.458c0 .549-.293 1.063-.771 1.34l-7.317 4.236c-.241.11-.516.165-.773.165zm2.256-5.816c-3.21 0-3.87-1.468-3.87-2.714 0-.11.092-.221.22-.221h.954c.11 0 .201.073.201.184.147.971.568 1.449 2.514 1.449 1.54 0 2.202-.35 2.202-1.175 0-.477-.185-.825-2.587-1.063-1.999-.2-3.246-.643-3.246-2.238 0-1.485 1.247-2.366 3.339-2.366 2.347 0 3.503.809 3.649 2.568a.297.297 0 0 1-.056.165c-.037.036-.091.073-.146.073h-.953a.212.212 0 0 1-.202-.164c-.221-1.012-.789-1.34-2.292-1.34-1.689 0-1.891.587-1.891 1.027 0 .531.237.696 2.514.99 2.256.293 3.32.715 3.32 2.294-.02 1.615-1.339 2.531-3.67 2.531z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> NodeJs Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-orange-500"
											viewBox="0 0 24 24"
											><path
												d="M4.136 3.012h15.729l-1.431 16.15-6.451 1.826-6.414-1.826-1.433-16.15zm5.266 7.302-.173-2.035 7.533.002.173-1.963-9.87-.002.522 5.998h6.835l-.243 2.566-2.179.602-2.214-.605-.141-1.58H7.691l.247 3.123L12 17.506l4.028-1.08.558-6.111H9.402v-.001z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> HTML Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-blue-500"
											viewBox="0 0 24 24"
											><path
												d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> CSS3 Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-blue-500"
											viewBox="0 0 24 24"
											><path
												d="M20.66 7a1.51 1.51 0 0 0-.55-.57l-7.34-4.24a1.67 1.67 0 0 0-1.54 0L3.89 6.43a1.68 1.68 0 0 0-.77 1.33v8.48a1.57 1.57 0 0 0 .22.76 1.51 1.51 0 0 0 .55.57l7.34 4.24a1.67 1.67 0 0 0 1.54 0l7.34-4.24a1.51 1.51 0 0 0 .55-.57 1.57 1.57 0 0 0 .22-.76V7.76a1.57 1.57 0 0 0-.22-.76zM12 17.92A5.92 5.92 0 1 1 17.13 9L16 9.71l-.36.2-1 .61A3 3 0 0 0 9 12a2.88 2.88 0 0 0 .4 1.48 3 3 0 0 0 5.13 0l2.6 1.52A5.94 5.94 0 0 1 12 17.92zm5.92-5.59h-.66V13h-.65v-.66H16v-.66h.66V11h.65v.66h.66zm2.47 0h-.66V13h-.66v-.66h-.65v-.66h.65V11h.66v.66h.66z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> C++ Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-blue-500"
											viewBox="0 0 24 24"
											><path
												d="M19.24 3H4.76A1.76 1.76 0 0 0 3 4.76v14.48A1.76 1.76 0 0 0 4.76 21h14.48A1.76 1.76 0 0 0 21 19.24V4.76A1.76 1.76 0 0 0 19.24 3zm-5.8 10h-2.25v6.44H9.4V13H7.15v-1.46h6.29zm5.8 5.28a1.71 1.71 0 0 1-.67.74 3 3 0 0 1-1 .39 5.81 5.81 0 0 1-1.2.12 7 7 0 0 1-1.23-.11 4.52 4.52 0 0 1-1-.33v-1.71l-.06-.06h.06v.07a3.41 3.41 0 0 0 1 .54 3.06 3.06 0 0 0 1.13.2 2.58 2.58 0 0 0 .6-.06 1.47 1.47 0 0 0 .42-.17.75.75 0 0 0 .25-.25.69.69 0 0 0-.06-.74 1.24 1.24 0 0 0-.35-.33 3.12 3.12 0 0 0-.53-.3l-.67-.28a3.57 3.57 0 0 1-1.37-1 2 2 0 0 1-.46-1.33 2.16 2.16 0 0 1 .24-1.06 2.09 2.09 0 0 1 .66-.71 2.88 2.88 0 0 1 1-.42 5.11 5.11 0 0 1 1.19-.13 7 7 0 0 1 1.09.07 4.53 4.53 0 0 1 .88.23v1.65a2.42 2.42 0 0 0-.42-.24 3.58 3.58 0 0 0-.49-.17 3 3 0 0 0-.49-.1 2.45 2.45 0 0 0-.46 0 2.29 2.29 0 0 0-.56.06 1.54 1.54 0 0 0-.43.16.78.78 0 0 0-.26.25.63.63 0 0 0-.09.33.62.62 0 0 0 .1.35 1.19 1.19 0 0 0 .3.29 2.15 2.15 0 0 0 .46.28l.63.28a6.56 6.56 0 0 1 .84.42 2.65 2.65 0 0 1 .64.49 1.79 1.79 0 0 1 .42.63 2.48 2.48 0 0 1 .14.85 2.68 2.68 0 0 1-.25 1.08z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100">
											Typescript Master
										</span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-purple-600 dark:fill-purple-400"
											viewBox="0 0 24 24"
											><path
												d="M2.15 16.78h1.57a.14.14 0 0 0 .14-.12l.35-1.82h1.22a4.88 4.88 0 0 0 1.51-.2A2.79 2.79 0 0 0 8 14a3.18 3.18 0 0 0 .67-.85 3.43 3.43 0 0 0 .36-1 2.43 2.43 0 0 0-.41-2.16 2.64 2.64 0 0 0-2.09-.78h-3a.16.16 0 0 0-.15.13L2 16.6a.19.19 0 0 0 0 .13.17.17 0 0 0 .15.05zM5 10.62h1a1.45 1.45 0 0 1 1.08.29c.17.18.2.52.11 1a1.81 1.81 0 0 1-.57 1.12 2.17 2.17 0 0 1-1.33.33h-.8zm9.8-.95a2.7 2.7 0 0 0-1.88-.51h-1.19l.33-1.76a.15.15 0 0 0 0-.13.16.16 0 0 0-.11 0h-1.57a.14.14 0 0 0-.14.12l-1.38 7.27a.13.13 0 0 0 0 .12.13.13 0 0 0 .11.06h1.54a.14.14 0 0 0 .14-.13l.77-4.07h1.11c.45 0 .61.1.66.16a.81.81 0 0 1 0 .62l-.61 3.24a.13.13 0 0 0 0 .12.14.14 0 0 0 .11.06h1.56a.16.16 0 0 0 .15-.13l.64-3.4a1.7 1.7 0 0 0-.24-1.64zm4.52-.51h-3.13a.14.14 0 0 0-.15.13l-1.46 7.31a.16.16 0 0 0 0 .13.14.14 0 0 0 .11.05h1.63a.14.14 0 0 0 .15-.12l.37-1.82h1.27a5.28 5.28 0 0 0 1.56-.2 3 3 0 0 0 1.18-.64 3.31 3.31 0 0 0 .7-.85 3.45 3.45 0 0 0 .37-1 2.38 2.38 0 0 0-.42-2.16 2.81 2.81 0 0 0-2.18-.83zm.62 2.77a1.83 1.83 0 0 1-.6 1.12 2.28 2.28 0 0 1-1.37.33h-.8l.54-2.76h1a1.6 1.6 0 0 1 1.13.29c.16.18.16.52.1 1.02z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> PHP Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-yellow-400"
											viewBox="0 0 24 24"
											><path
												d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.617H5.92s-2.927-.332-2.927 4.282 2.555 4.45 2.555 4.45h1.524v-2.141s-.083-2.554 2.513-2.554zm-.056-5.74a.784.784 0 1 1 0-1.57.784.784 0 1 1 0 1.57z"
											/><path
												d="M18.452 7.532h-1.524v2.141s.083 2.554-2.513 2.554h-4.328s-2.432-.04-2.432 2.35v3.951s-.369 2.391 4.409 2.391c4.573 0 4.288-1.983 4.288-1.983l-.006-2.054h-4.363v-.617h6.097s2.927.332 2.927-4.282-2.555-4.451-2.555-4.451zm-3.981 10.436a.784.784 0 1 1 0 1.57.784.784 0 1 1 0-1.57z"
											/>
										</svg>
										<span class="tooltip-budges group-hover/js:scale-y-100"> Python Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-blue-500"
											viewBox="0 0 24 24"
											><circle cx="12" cy="11.245" r="1.785" /><path
												d="m7.002 14.794-.395-.101c-2.934-.741-4.617-2.001-4.617-3.452 0-1.452 1.684-2.711 4.617-3.452l.395-.1.111.391a19.507 19.507 0 0 0 1.136 2.983l.085.178-.085.178c-.46.963-.841 1.961-1.136 2.985l-.111.39zm-.577-6.095c-2.229.628-3.598 1.586-3.598 2.542 0 .954 1.368 1.913 3.598 2.54.273-.868.603-1.717.985-2.54a20.356 20.356 0 0 1-.985-2.542zm10.572 6.095-.11-.392a19.628 19.628 0 0 0-1.137-2.984l-.085-.177.085-.179c.46-.961.839-1.96 1.137-2.984l.11-.39.395.1c2.935.741 4.617 2 4.617 3.453 0 1.452-1.683 2.711-4.617 3.452l-.395.101zm-.41-3.553c.4.866.733 1.718.987 2.54 2.23-.627 3.599-1.586 3.599-2.54 0-.956-1.368-1.913-3.599-2.542a20.683 20.683 0 0 1-.987 2.542z"
											/><path
												d="m6.419 8.695-.11-.39c-.826-2.908-.576-4.991.687-5.717 1.235-.715 3.222.13 5.303 2.265l.284.292-.284.291a19.718 19.718 0 0 0-2.02 2.474l-.113.162-.196.016a19.646 19.646 0 0 0-3.157.509l-.394.098zm1.582-5.529c-.224 0-.422.049-.589.145-.828.477-.974 2.138-.404 4.38.891-.197 1.79-.338 2.696-.417a21.058 21.058 0 0 1 1.713-2.123c-1.303-1.267-2.533-1.985-3.416-1.985zm7.997 16.984c-1.188 0-2.714-.896-4.298-2.522l-.283-.291.283-.29a19.827 19.827 0 0 0 2.021-2.477l.112-.16.194-.019a19.473 19.473 0 0 0 3.158-.507l.395-.1.111.391c.822 2.906.573 4.992-.688 5.718a1.978 1.978 0 0 1-1.005.257zm-3.415-2.82c1.302 1.267 2.533 1.986 3.415 1.986.225 0 .423-.05.589-.145.829-.478.976-2.142.404-4.384-.89.198-1.79.34-2.698.419a20.526 20.526 0 0 1-1.71 2.124z"
											/><path
												d="m17.58 8.695-.395-.099a19.477 19.477 0 0 0-3.158-.509l-.194-.017-.112-.162A19.551 19.551 0 0 0 11.7 5.434l-.283-.291.283-.29c2.08-2.134 4.066-2.979 5.303-2.265 1.262.727 1.513 2.81.688 5.717l-.111.39zm-3.287-1.421c.954.085 1.858.228 2.698.417.571-2.242.425-3.903-.404-4.381-.824-.477-2.375.253-4.004 1.841.616.67 1.188 1.378 1.71 2.123zM8.001 20.15a1.983 1.983 0 0 1-1.005-.257c-1.263-.726-1.513-2.811-.688-5.718l.108-.391.395.1c.964.243 2.026.414 3.158.507l.194.019.113.16c.604.878 1.28 1.707 2.02 2.477l.284.29-.284.291c-1.583 1.627-3.109 2.522-4.295 2.522zm-.993-5.362c-.57 2.242-.424 3.906.404 4.384.825.47 2.371-.255 4.005-1.842a21.17 21.17 0 0 1-1.713-2.123 20.692 20.692 0 0 1-2.696-.419z"
											/><path
												d="M12 15.313c-.687 0-1.392-.029-2.1-.088l-.196-.017-.113-.162a25.697 25.697 0 0 1-1.126-1.769 26.028 26.028 0 0 1-.971-1.859l-.084-.177.084-.179c.299-.632.622-1.252.971-1.858.347-.596.726-1.192 1.126-1.77l.113-.16.196-.018a25.148 25.148 0 0 1 4.198 0l.194.019.113.16a25.136 25.136 0 0 1 2.1 3.628l.083.179-.083.177a24.742 24.742 0 0 1-2.1 3.628l-.113.162-.194.017c-.706.057-1.412.087-2.098.087zm-1.834-.904c1.235.093 2.433.093 3.667 0a24.469 24.469 0 0 0 1.832-3.168 23.916 23.916 0 0 0-1.832-3.168 23.877 23.877 0 0 0-3.667 0 23.743 23.743 0 0 0-1.832 3.168 24.82 24.82 0 0 0 1.832 3.168z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> React Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-sky-500"
											viewBox="0 0 24 24"
											><path
												d="M3.79 10.17a.18.18 0 0 0-.11 0l-.2.27H7a.15.15 0 0 0 .1-.06l.17-.26v-.05zm-1.47.89a.14.14 0 0 0-.11 0l-.2.26v.05h4.6a.09.09 0 0 0 .09-.06l.08-.23v-.06zM4.6 12a.13.13 0 0 0-.1.06l-.13.24v.06h2.15a.08.08 0 0 0 .07-.07v-.23s0-.07-.06-.07zm15.99-3.07a3.62 3.62 0 0 0-2.78-.5 4.09 4.09 0 0 0-2.72 1.63 4 4 0 0 0-.67 1.26h-3.14a.25.25 0 0 0-.24.16c-.14.25-.37.76-.5 1.06s0 .29.18.29h1.88a2.8 2.8 0 0 1-.26.36 1.81 1.81 0 0 1-1.65.65 1.53 1.53 0 0 1-1.32-1.53 2.07 2.07 0 0 1 1-1.85 1.71 1.71 0 0 1 1.77-.15 1.36 1.36 0 0 1 .45.37c.13.15.14.14.29.1l1.63-.43c.12 0 .16-.08.1-.16a3 3 0 0 0-1.13-1.38 3.35 3.35 0 0 0-2.58-.47A4.31 4.31 0 0 0 8.16 10a3.81 3.81 0 0 0-.82 2.85A3 3 0 0 0 8.57 15a3.46 3.46 0 0 0 2.62.65A4.06 4.06 0 0 0 14 14a4.33 4.33 0 0 0 .41-.69 3 3 0 0 0 1 1.55 3.68 3.68 0 0 0 2.38.86c.25 0 .51 0 .78-.09a4.51 4.51 0 0 0 2.33-1.25A3.72 3.72 0 0 0 22 11.1a3 3 0 0 0-1.41-2.17zm-1.78 4.73a1.81 1.81 0 0 1-1.59.06 1.61 1.61 0 0 1-.9-1.84A2.12 2.12 0 0 1 18 10.19a1.59 1.59 0 0 1 2 1.29 2.91 2.91 0 0 1 0 .32 2.11 2.11 0 0 1-1.19 1.86z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> Golang Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-rose-500"
											viewBox="0 0 24 24"
											><path d="M10.483 12.482h3.034L12 8.831z" /><path
												d="M12 3.074 3.689 6.038l1.268 10.987 7.043 3.9 7.043-3.9 1.268-10.987L12 3.074zm5.187 13.621H15.25l-1.045-2.606h-4.41L8.75 16.695H6.813L12 5.047l5.187 11.648z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> Angular Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-green-500"
											viewBox="0 0 24 24"
											><path
												d="m12 12.765 5.592-9.437h-3.276L12 7.33v.002L9.688 3.328h-3.28z"
											/><path
												d="M18.461 3.332 12 14.235 5.539 3.332H1.992L12 20.672l10.008-17.34z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> Vue Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges dark:fill-white"
											viewBox="0 0 24 24"
											><path
												d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> FrontEnd Master </span>
									</div>
									<div class="group/js relative overflow-visible flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon-tooltip-budges fill-emerald-600 dark:fill-emerald-500"
											viewBox="0 0 24 24"
											><path
												d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z"
											/></svg
										>
										<span class="tooltip-budges group-hover/js:scale-y-100"> BackEnd Master </span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-span-full grid grid-flow-row grid-cols-6 w-full h-fit px-14 mb-10 gap-3">
				<a
					href="/me/privacy"
					class="col-span-2 max-md:col-span-full w-full p-1 rounded-md flex justify-start gap-5 align-middle transition-all ease-in duration-150 bg-slate-500 hover:bg-blue-500 group dark:hover:bg-emerald-600"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-20 fill-white"
						><path
							d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897V12H5.51a15.473 15.473 0 0 1-.544-4.365L12 4.118V12h6.46c-.759 2.74-2.498 5.979-6.46 7.897z"
						/></svg
					>
					<span class="text-xl text-start text-white w-full h-full pt-2">Privacy</span>
				</a>
				<div class="col-span-2 max-md:col-span-full w-full rounded-md h-full">
					<button class="btn btn-square btn-ghost w-full h-full">
						<label
							class="transition-all ease-in duration-150 swap swap-rotate w-full h-full bg-slate-500 hover:bg-blue-500 dark:hover:bg-emerald-600 dark:bg-slate-500 rounded-md flex justify-between px-2 py-1"
						>
							<input type="checkbox" class="hidden" />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="w-12 swap-on fill-white"
								id="sun"
								><path
									d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
								/></svg
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="w-12 swap-off fill-white"
								id="moon"
								><path
									d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"
								/></svg
							>
						</label>
					</button>
				</div>
				<form action="signin?/signout" method="post" class="col-span-2 max-md:col-span-full w-full">
					<button
						class="h-full w-full transition-all ease-in duration-150 flex p-1 pl-0 rounded-md justify-start gap-5 align-middle bg-slate-500 hover:bg-blue-500 group dark:hover:bg-emerald-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-[4.3rem] fill-white"
							viewBox="0 0 24 24"
							><path d="M16 13v-2H7V8l-5 4 5 4v-3z" /><path
								d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
							/></svg
						>
						<span class="text-xl text-start text-white w-full h-full pt-2"> Sign Out </span>
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

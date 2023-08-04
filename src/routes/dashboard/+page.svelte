<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { timeSince } from '$lib/functions/dateFormat.js';
	import { getRandomLightColor } from '$lib/functions/generateColor.js';
	import { formatWords } from '$lib/functions/wordFormat.js';
	import Chart from 'chart.js/auto';
	import type { ChartItem } from 'chart.js/auto';
	import { onMount } from 'svelte';

	export let data;

	let counter = 1;

	let screenSize: any;
	$: screenSize;

	let dataset: any[] = [{ month: '', id: '', token: 0 }];
	dataset.pop();

	function arrayParser(): any[] {
		let datas: any[] = [
			{
				label: '',
				data: [],
				backgroundColor: '#3b82f6',
				pointBorderColor: '#3b82f6',
				pointBackgroundColor: '#3d79ff',
				borderColor: '#3b82f6',
				borderWidth: 1
			}
		];

		datas.pop();

		data.totalToken.map(async (value: any) => {
			let color = getRandomLightColor();

			if (value.uName == '.tere_') color = '#fc0362';

			datas.push({
				label: value.uName,
				data: value.datas.map((el: any) => {
					return el.tokens;
				}),
				backgroundColor: color,
				pointBorderColor: color,
				pointBackgroundColor: color,
				borderColor: color,
				borderWidth: 1
			});
		});

		return datas;
	}

	onMount(() => {
		let parsetData = arrayParser();

		let chartsLIghtUsage = new Chart(document.getElementById('lightChartUsage') as ChartItem, {
			type: 'line',
			data: {
				labels: data.isO
					? ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
					: data.totalToken.map((val: any) => val.month),
				datasets: data.isO
					? parsetData
					: [
							{
								label: 'Token Used',
								data: data.totalToken.map((val: any) => val.token),
								backgroundColor: '#3b82f6',
								pointBorderColor: '#3b82f6',
								pointBackgroundColor: '#3d79ff',
								borderColor: '#3b82f6',
								borderWidth: 1
							}
					  ]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							font: {
								size: 15
							}
						}
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								let contentLabel: string[] = [];
								let label = 'Token: ' + context.parsed.y;

								contentLabel.push(label);
								contentLabel.push('' + new Date(Date.now()).getFullYear());

								return contentLabel;
							}
						}
					}
					// tooltip: {
					// 	callbacks: {
					// 		label: function (context) {
					// 			let contentLabel = [];
					// 			contentLabel.push(context.dataset.label + ': ' + context.parsed.y || '');
					// 			let datas: {
					// 				month: string | null;
					// 				data: { token: number | -1; datetime: number | -1 };
					// 			} = { month: null, data: { token: -1, datetime: -1 } };
					// 			for (let i = 0; i < context.dataset.data.length; i++) {
					// 				dataDummmy.find((val) => {
					// 					if (val.month == context.label && val.data.token == context.dataset.data[i])
					// 						datas = val;
					// 				});
					// 			}
					// 			let dates = `Date: ${new Date(datas?.data.datetime!).toDateString()}`;
					// 			contentLabel.push(dates);
					// 			return contentLabel;
					// 		}
					// 	}
					// }
				},
				color: 'white',
				scales: {
					y: {
						beginAtZero: true,
						border: {
							color: '#ffffff'
						},
						ticks: {
							color: 'white'
						},
						suggestedMax: 1500
					},
					x: {
						beginAtZero: true,
						border: {
							color: '#ffffff'
						},
						ticks: {
							color: 'white'
						}
					}
				}
			}
		});
		let chartsDarkUsage = new Chart(document.getElementById('darkChartUsage') as ChartItem, {
			type: 'line',
			data: {
				labels: data.isO
					? ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
					: data.totalToken.map((val: any) => val.month),
				datasets: data.isO
					? parsetData
					: [
							{
								label: 'Token Used',
								data: data.isO ? parsetData : data.totalToken.map((val: any) => val.token),
								backgroundColor: '#10b880',
								pointBorderColor: '#10b880',
								pointBackgroundColor: '#10b880',
								borderColor: '#10b880',
								borderWidth: 1
							}
					  ]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							font: {
								size: 15
							}
						}
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								let contentLabel: string[] = [];
								let label = 'Token: ' + context.parsed.y;

								contentLabel.push(label);
								contentLabel.push('' + new Date(Date.now()).getFullYear());

								return contentLabel;
							}
						}
					}
				},
				color: 'white',
				scales: {
					y: {
						beginAtZero: true,
						border: {
							color: '#ffffff'
						},
						ticks: {
							color: '#10b981'
						},
						suggestedMax: 1500
					},
					x: {
						beginAtZero: true,
						border: {
							color: '#ffffff'
						},
						ticks: {
							color: '#10b981'
						}
					}
				}
			}
		});

		window.addEventListener('afterprint', () => {
			chartsDarkUsage.resize();
			chartsLIghtUsage.resize();
		});
	});

	if (browser) document.title = PUBLIC_TITLE + ' | Dashboard';
</script>

<svelte:window bind:innerWidth={screenSize} />

<div class="w-full px-10 max-md:px-0 py-2 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		{#if !$page.data}
			<span class="loading loading-spinner loading-lg" />
		{:else}
			<div
				class="relative chart-wrapper col-span-full w-full h-96 max-md:h-[384px] bg-[#1D242B] dark:bg-slate-800 dark:text-white p-5 text-center rounded-xl dark:border-emerald-500 border-solid border-2 flex align-middle justify-center overflow-auto"
			>
				<canvas
					id="lightChartUsage"
					class="visible dark:invisible absolute w-full dark:w-full"
					style="height:50vh !important;"
				/>
				<canvas
					id="darkChartUsage"
					class="invisible dark:visible absolute w-full dark:w-full"
					style="height: 50vh !important;"
				/>
			</div>
			<div
				class="content col-span-2 max-md:col-span-full h-fit max-h-60 max-md:max-h-fit bg-[#1D242B] dark:bg-slate-800 text-white dark:text-white p-5 pb-10 text-center rounded-xl dark:border-emerald-500 border-solid border-2 overflow-hidden"
			>
				<div class="title mb-5">
					<h1 class="text-xl font-bold font-[Quicksand]">Token Used</h1>
				</div>
				<div class="flex align-middle justify-start font-[Quicksand] w-full max-md:block">
					<div
						class="radial-progress text-blue-500 dark:text-emerald-500 text-md h-[9rem] w-[9rem] after:text-transparent"
						style="--value:{Math.floor(
							((data.currentToken == null ? 1500 : data.currentToken.tokenUsed) / 1500) * 100
						)};"
					>
						<span class="text-white">
							{data.currentToken != null ? data.currentToken.tokenUsed : 0}/1500
						</span>
					</div>
					<div
						class="pr-[0.55rem] transition-all duration-150 border-l-2 max-md:border-l-0 max-md:mt-5 border-white border-solid ml-5 max-md:ml-0 pl-5 w-3/4 max-md:w-full max-h-32 max-md:max-h-52 max-md:h-52 overflow-hidden hover:overflow-auto max-md:overflow-auto max-md:border-t-2 max-md:pt-2 justify-center dark:dark-scroll"
					>
						{#if data.historyToken != null}
							{#each data.historyToken as { day, token }, idx}
								<p class="flex align-middle justify-between w-full max-md:break-words gap-10">
									<span>{token} Token Used</span>
									{day}
								</p>
								<hr class="my-6 w-full" />
							{/each}
						{:else}
							<p class="flex align-middle justify-center w-full h-full max-md:break-words gap-10">
								<span class="text-2xl text-center w-full h-full">Empty</span>
							</p>
						{/if}
					</div>
				</div>
			</div>
			<div
				class="content col-span-2 px-14 max-md:px-5 max-md:col-span-full h-full bg-[#1D242B] dark:bg-slate-800 text-white dark:text-white p-5 text-center rounded-xl dark:border-emerald-500 border-solid border-2"
			>
				<div class="flex align-middle justify-center">
					<h3 class="text-xl ml-28 max-md:ml-5 text-center font-bold font-[Quicksand] w-5/6">
						<span>Last Conversation</span>
					</h3>
					<button class="w-1/6 flex justify-end">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 fill-white"
							><path
								d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
							/></svg
						>
					</button>
				</div>
				<hr class="mt-2 mb-3" />
				<ul
					class="text-left max-h-32 overflow-hidden hover:overflow-auto max-md:overflow-auto dark:dark-scroll pr-2"
				>
					{#if data.historyChat != null}
						{#each data.historyChat as val, idx}
							{#if val.sender == 'user'}
								<li class="mt-2 flex justify-between">
									<span class=" mr-2">
										{idx + 1}.
										{formatWords(val.content, 3, screenSize <= 768 ? true : false)}
									</span>
									<span>
										{timeSince(new Date(val.created_at).getTime())}
									</span>
								</li>
							{/if}
						{/each}
					{:else}
						<li class="mt-2 flex justify-between h-full w-full">
							<span class=" mr-2 h-full w-full text-center text-2xl"> Empty </span>
						</li>
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
</style>

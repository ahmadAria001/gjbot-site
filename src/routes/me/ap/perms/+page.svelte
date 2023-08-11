<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, goto } from '$app/navigation';
	import { PUBLIC_TITLE } from '$env/static/public';
	import Modal from '$lib/components/modal.svelte';
	import { onMount } from 'svelte';

	export let data;
	export let form;

	$: form;
	$: data;

	const rowClick = (el: MouseEvent) => {
		const button = <HTMLElement>el.currentTarget;

		let nm: HTMLInputElement[] = [];
		document.querySelectorAll('#name').forEach((element) => {
			nm.push(element as HTMLInputElement);
		});

		let permcode: HTMLInputElement[] = [];
		document.querySelectorAll('#permcode').forEach((element) => {
			permcode.push(element as HTMLInputElement);
		});

		let _id: HTMLInputElement[] = [];
		document.querySelectorAll('#_id').forEach((element) => {
			_id.push(element as HTMLInputElement);
		});

		nm.map((val) => {
			val.value = data.perms.find((val: any) => val._id === button.id).name;
		});
		permcode.map((val) => {
			val.value = data.perms.find((val: any) => val._id === button.id).code;
		});
		_id.map((val) => {
			val.value = data.perms.find((val: any) => val._id === button.id)._id;
		});

		formButtonConditions(_id[1]);
	};

	const formButtonConditions = (_id: HTMLElement) => {
		let input = <HTMLInputElement>_id;

		// let roleInput = ['name', 'xmlns', 'class', 'viewBox', 'path', '_id'];

		const submitBtn = <HTMLButtonElement>document.getElementById('submit');
		const updateBtn = <HTMLButtonElement>document.getElementById('update');
		const deleteBtn = <HTMLButtonElement>document.getElementById('delete');

		if (input.value != '') {
			submitBtn.disabled = true;
			updateBtn.disabled = false;
			deleteBtn.disabled = false;
		} else {
			submitBtn.disabled = false;
			updateBtn.disabled = true;
			deleteBtn.disabled = true;
		}
	};

	const cleanInputForm = () => {
		let nm: HTMLInputElement[] = [];
		document.querySelectorAll('#name').forEach((element) => {
			nm.push(element as HTMLInputElement);
		});

		// const nm = <HTMLInputElement>document.getElementById('name');
		let xmls: HTMLInputElement[] = [];
		document.querySelectorAll('#xmlns').forEach((element) => {
			xmls.push(element as HTMLInputElement);
		});
		let permcode: HTMLInputElement[] = [];
		document.querySelectorAll('#permcode').forEach((element) => {
			permcode.push(element as HTMLInputElement);
		});
		let __id: HTMLInputElement[] = [];
		document.querySelectorAll('#_id').forEach((element) => {
			__id.push(element as HTMLInputElement);
		});

		nm.map((val) => {
			val.value = '';
		});
		xmls.map((val) => {
			val.value = '';
		});
		permcode.map((val) => {
			val.value = '';
		});
		__id.map((val) => {
			val.value = '';
		});
	};

	let name: HTMLInputElement;
	let permCode: HTMLInputElement;
	let _id: HTMLInputElement;

	onMount(() => {
		if (browser) document.title = PUBLIC_TITLE + ' | Permissions';

		data.perms.map((val: any) => {
			document.getElementById(val._id)?.addEventListener('click', rowClick);
		});
	});
</script>

<Modal
	confirm="Confirm"
	desc="are you sure wanted to delete the permission?"
	title="Delete"
	id="delete-modal"
	formAction="perms?/delete"
	methode="post"
	style="bg-rose-600 hover:bg-rose-500 text-white"
	inputToReturn={`<input type="text" name="name" readonly id="name" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		name != undefined ? name.value : null
	}" required placeholder="Name"/> <input type="text" readonly name="permcode" id="permcode" class="mt-2 pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		permCode != undefined ? permCode.value : null
	}" required placeholder="Permission Code"/><input type="text" readonly name="_id" id="_id" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		_id != undefined ? _id.value : null
	}" placeholder="ID" readonly class=""/>`}
/>

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
<div class="container-alert fixed max-md:static top-20 right-0 xl:right-4 xl:top-24 z-[50]">
	{#if form?.status === 200}
		<div
			class="alert alert-success py-1 rounded-lg dark:text-white dark:bg-emerald-600 mb-2"
			id="tooltip-err"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="fill-current shrink-0 h-6 w-6"
				><path
					d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
				/><path
					d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"
				/></svg
			>
			<span class="max-md:text-[0.78rem]">
				{form?.message}
			</span>
		</div>
	{:else if form?.status === 400}
		<div
			class="alert alert-error py-1 rounded-lg dark:text-white dark:bg-rose-600 mb-2"
			id="tooltip-current-pw"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6 max-md:w-4"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span class="max-md:text-[0.78rem]">
				{#if form?.status == 400}
					{form?.message}
				{/if}
			</span>
		</div>
	{/if}
</div>
<div class="w-full px-10 max-md:px-0 py-0 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		<div class="col-span-full grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
			<div
				class="col-span-full max-h-[30rem] rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none"
			>
				<div class="overflow-x-auto">
					<table class="table table-zebra">
						<!-- head -->
						<thead>
							<tr>
								<th>No.</th>
								<th>Name</th>
								<th>Code</th>
								<th>Creator</th>
								<th>Created at</th>
								<th>Updated by</th>
								<th>Updated at</th>
							</tr>
						</thead>
						<tbody>
							{#each data.perms as { _id, name, code, created_by, created_at, updated_by, updated_at }, idx}
								<tr id={_id}>
									<th>{idx + 1}</th>
									<td>{name}</td>
									<td>{code}</td>
									<td>{created_by != null ? created_by : ''}</td>
									<td>{created_at != 0 ? new Date(created_at).toLocaleString() : ''}</td>
									<td>{updated_by != null ? created_by : ''}</td>
									<td>{updated_at != 0 ? new Date(created_at).toLocaleString() : ''}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<div
				class="col-span-full rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none"
			>
				<form
					action="perms?/create"
					method="post"
					id="formRole"
					class="grid grid-cols-2 grid-flow-row gap-2 w-full mb-5 max-md:px-2 max-lg:px-2 max-xl:px-5 px-16 mt-5 relative"
				>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">Name</span>
						<label
							class="relative w-full max-md:w-full flex max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"
								/><path
									d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"
								/><path
									d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"
								/></svg
							>
							<input
								type="text"
								name="name"
								id="name"
								required
								placeholder="Name"
								class="pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
							/>
						</label>
					</div>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">Premission Code</span>
						<label
							class="relative w-full max-md:w-full flex max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								viewBox="0 0 24 24"
								><path
									d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z"
								/></svg
							>
							<input
								type="number"
								name="permcode"
								id="permcode"
								required
								placeholder="Premission Code"
								class="pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
							/>
						</label>
					</div>
					<div class="col-span-full relative">
						<span class="text-left font-[Quicksand] font-bold">ID</span>
						<label
							class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M8.293 6.293 2.586 12l5.707 5.707 1.414-1.414L5.414 12l4.293-4.293zm7.414 11.414L21.414 12l-5.707-5.707-1.414 1.414L18.586 12l-4.293 4.293z"
								/></svg
							>
							<input
								type="text"
								name="_id"
								id="_id"
								placeholder="ID"
								readonly
								class="pr-2 font-[Quicksand] read-only:border-gray-300 dark:read-only:border-emerald-900 read-only:text-gray-500 dark:read-only:text-gray-400 text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
							/>
						</label>
					</div>
					<div class="col-span-full relative flex gap-5 max-md:block max-lg:justify-center">
						<button
							class="mt-1 mb-2 text-white w-fit max-md:w-full px-10 transition-all duration-150
							 bg-blue-600 hover:bg-blue-500 dark:hover:bg-emerald-600 dark:hover:text-white
							 dark:bg-transparent dark:border-solid dark:border-2 dark:text-emerald-400
							  dark:border-emerald-400 dark:hover:shadow-emerald-500 dark:hover:border-emerald-500 dark:shadow-lg
							   dark:drop-shadow-md h-10 rounded-xl font-[Roboto] font-extrabold dark:disabled:shadow-none
							   disabled:bg-transparent disabled:hover:bg-transparent disabled:text-emerald-800 disabled:hover:text-gray-600"
							id="submit"
						>
							Create New
						</button>
						<button
							disabled
							formaction="perms?/update"
							class="mt-1 mb-2 text-white w-fit max-md:w-full px-10 transition-all duration-150
							 bg-yellow-600 hover:bg-yellow-500 dark:hover:bg-orange-500 dark:hover:text-white
							 dark:bg-transparent dark:border-solid dark:border-2 dark:text-orange-600
							  dark:border-orange-600 dark:hover:shadow-orange-400 dark:hover:border-orange-400 dark:shadow-lg
							   dark:drop-shadow-md h-10 rounded-xl font-[Roboto] font-extrabold dark:disabled:shadow-none
							   disabled:bg-transparent disabled:hover:bg-transparent disabled:text-orange-800 disabled:border-orange-800 disabled:hover:text-yellow-700"
							id="update"
						>
							Update
						</button>
						<button
							disabled
							type="button"
							class="mt-1 mb-2 text-white w-fit max-md:w-full px-10 transition-all duration-150
							 bg-rose-600 hover:bg-rose-500 dark:hover:bg-rose-600 dark:hover:text-white
							 dark:bg-transparent dark:border-solid dark:border-2 dark:text-rose-500
							  dark:border-rose-500 dark:hover:shadow-rose-500 dark:hover:border-rose-500 dark:shadow-lg
							   dark:drop-shadow-md h-10 rounded-xl font-[Roboto] font-extrabold dark:disabled:shadow-none
							   disabled:bg-transparent disabled:hover:bg-transparent disabled:text-rose-800 disabled:border-rose-800 disabled:hover:text-rose-600"
							id="delete"
							on:click={() => {
								//@ts-ignore
								document.getElementById('delete-modal').showModal();
							}}
						>
							Delete
						</button>
						<button
							type="reset"
							class="mt-1 mb-2 text-white w-fit max-md:w-full px-10 transition-all duration-150
							 bg-blue-600 hover:bg-blue-500 dark:hover:bg-emerald-600 dark:hover:text-white
							 dark:bg-transparent dark:border-solid dark:border-2 dark:text-emerald-400
							  dark:border-emerald-400 dark:hover:shadow-emerald-500 dark:hover:border-emerald-500 dark:shadow-lg
							   dark:drop-shadow-md h-10 rounded-xl font-[Roboto] font-extrabold
							   disabled:bg-transparent disabled:hover:bg-transparent disabled:text-emerald-800 disabled:hover:text-gray-600"
							id="clear"
							on:click={() => {
								const _id = document.getElementById('_id');
								cleanInputForm();

								if (_id != null) formButtonConditions(_id);
							}}
						>
							Clear
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
</style>

<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PUBLIC_TITLE } from '$env/static/public';
	import Modal from '$lib/components/modal.svelte';
	import { onMount } from 'svelte';

	export let data;
	export let form;

	$: form;

	const createPermsEl = (val: any) => {
		let permEl: any[] = [];
		if (val != null) {
			val.forEach((element: any) => {
				permEl.push(` <span id="${element.id}" hidden/> `);
			});
		}

		return permEl;
	};

	const roleClick = (el: MouseEvent) => {
		cleanInputRole();

		const button = <HTMLElement>el.currentTarget;

		let nm: HTMLInputElement[] = [];
		document.querySelectorAll('#name').forEach((element) => {
			nm.push(element as HTMLInputElement);
		});

		let permissionContent: HTMLInputElement[] = [];
		button.querySelectorAll(`span`).forEach((element) => {
			permissionContent.push(element as HTMLInputElement);
		});

		// const nm = <HTMLInputElement>document.getElementById('name');
		let xmls: HTMLInputElement[] = [];
		document.querySelectorAll('#xmlns').forEach((element) => {
			xmls.push(element as HTMLInputElement);
		});
		let clsx: HTMLInputElement[] = [];
		document.querySelectorAll('#class').forEach((element) => {
			clsx.push(element as HTMLInputElement);
		});
		let viewbox: HTMLInputElement[] = [];
		document.querySelectorAll('#viewBox').forEach((element) => {
			viewbox.push(element as HTMLInputElement);
		});
		let pat: HTMLInputElement[] = [];
		document.querySelectorAll('#path').forEach((element) => {
			pat.push(element as HTMLInputElement);
		});
		let __id: HTMLInputElement[] = [];
		document.querySelectorAll('#_id').forEach((element) => {
			__id.push(element as HTMLInputElement);
		});
		let styles: HTMLInputElement[] = [];
		document.querySelectorAll('#style').forEach((element) => {
			styles.push(element as HTMLInputElement);
		});

		permissionContent.map((val: HTMLElement) => {
			createInputPerms(val.getAttribute('id')?.toString()!);
		});

		nm.map((val) => {
			val.value = data.parsedRole.find((val: any) => val._id === button.id).name;
		});
		xmls.map((val) => {
			val.value = data.parsedRole.find((val: any) => val._id === button.id).xmlns;
		});
		clsx.map((val) => {
			val.value = data.parsedRole.find((val: any) => val._id === button.id).cls;
		});
		viewbox.map((val) => {
			val.value = data.parsedRole.find((val: any) => val._id === button.id).viewBox;
		});
		pat.map((val) => {
			val.value = data.parsedRole.find((val: any) => val._id === button.id).path;
		});
		__id.map((val) => {
			val.value = data.parsedRole.find((val: any) => val._id === button.id)._id;
		});
		styles.map((val) => {
			val.value = data.parsedRole.find((val: any) => val._id === button.id).style;
		});

		roleButtonConditions(_id);
	};

	const cleanInputRole = () => {
		let nm: HTMLInputElement[] = [];
		document.querySelectorAll('#name').forEach((element) => {
			nm.push(element as HTMLInputElement);
		});

		// const nm = <HTMLInputElement>document.getElementById('name');
		let xmls: HTMLInputElement[] = [];
		document.querySelectorAll('#xmlns').forEach((element) => {
			xmls.push(element as HTMLInputElement);
		});
		let selectPerm: HTMLSelectElement[] = [];
		document.querySelectorAll('#selectPerms').forEach((element) => {
			selectPerm.push(element as HTMLSelectElement);
		});
		let clsx: HTMLInputElement[] = [];
		document.querySelectorAll('#class').forEach((element) => {
			clsx.push(element as HTMLInputElement);
		});
		let viewbox: HTMLInputElement[] = [];
		document.querySelectorAll('#viewBox').forEach((element) => {
			viewbox.push(element as HTMLInputElement);
		});
		let pat: HTMLInputElement[] = [];
		document.querySelectorAll('#path').forEach((element) => {
			pat.push(element as HTMLInputElement);
		});
		let __id: HTMLInputElement[] = [];
		document.querySelectorAll('#_id').forEach((element) => {
			__id.push(element as HTMLInputElement);
		});
		let styles: HTMLInputElement[] = [];
		document.querySelectorAll('#style').forEach((element) => {
			styles.push(element as HTMLInputElement);
		});
		let permsContainer = <HTMLElement>document.getElementById('permissionsContainer');
		permsContainer.replaceChildren();

		nm.map((val) => {
			val.value = '';
		});
		selectPerm.map((val) => {
			val.getElementsByTagName('option')[0].selected = true;
		});
		xmls.map((val) => {
			val.value = '';
		});
		clsx.map((val) => {
			val.value = '';
		});
		viewbox.map((val) => {
			val.value = '';
		});
		pat.map((val) => {
			val.value = '';
		});
		__id.map((val) => {
			val.value = '';
		});
		styles.map((val) => {
			val.value = '';
		});
	};
	const roleButtonConditions = (_id: HTMLElement) => {
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

	const createInputPerms = (_id: string) => {
		let selectionPerms = <HTMLSelectElement>document.getElementById('selectPerms');
		if (selectionPerms.getElementsByTagName('option')[0].selected == true && _id == '') return;

		let permsContainer = <HTMLElement>document.getElementById('permissionsContainer');
		let inputPerm = document.createElement('input');
		let inputHiddenPerm = document.createElement('input');

		inputPerm.setAttribute('id', _id);
		inputPerm.value =
			data.permissions[data.permissions.findIndex((val: any) => val._id == _id)].name!;
		inputPerm.setAttribute('value', _id);
		inputPerm.setAttribute('disabled', 'true');
		inputPerm.setAttribute('name', 'permDisplay');
		inputPerm.setAttribute(
			'class',
			'bg-blue-600 dark:bg-emerald-700 text-white rounded-lg px-2 max-w-fit w-[5rem] text-center cursor-pointer'
		);

		inputHiddenPerm.setAttribute('id', _id);
		inputHiddenPerm.setAttribute('value', _id);
		inputHiddenPerm.setAttribute('readonly', 'true');
		inputHiddenPerm.setAttribute('hidden', 'true');
		inputHiddenPerm.setAttribute('name', 'permissions');
		inputHiddenPerm.setAttribute(
			'class',
			'bg-blue-600 dark:bg-emerald-700 text-white rounded-lg px-2 max-w-fit w-[5rem] text-center cursor-pointer'
		);

		permsContainer.append(inputPerm);
		permsContainer.append(inputHiddenPerm);

		permsContainer.addEventListener('click', (evt) => {
			let permTarget = <HTMLInputElement>evt.target;

			permsRemover(permTarget.getAttribute('id')?.toString()!);

			// if (permTarget.type != undefined) {
			// 	const targeet = document
			// 		.querySelectorAll(`[id='${permTarget.getAttribute('id')?.toString()}']`)
			// 		.forEach((val) => val.remove());

			// 	// console.log(targeet);
			// }
		});
	};

	const permsRemover = (id: string) => {
		document.querySelectorAll(`[id='${id}']`).forEach((val) => val.remove());
	};

	let name: HTMLInputElement;
	let xmlns: HTMLInputElement;
	let cls: HTMLInputElement;
	let viewBox: HTMLInputElement;
	let path: HTMLInputElement;
	let _id: HTMLInputElement;
	let style: HTMLInputElement;

	let selectedPermsVal: any;

	onMount(async () => {
		if (data != undefined) {
			data.parsedRole.map((val: any) => {
				if (val != undefined)
					document.getElementById(val._id)!.addEventListener('click', roleClick);
			});
		}

		if (browser) document.title = PUBLIC_TITLE + ' | Roles Management';
	});
</script>

<Modal
	confirm="Confirm"
	desc="are you sure wanted to delete the role?"
	title="Delete"
	id="delete-modal"
	formAction="roles?/delete"
	methode="post"
	style="bg-rose-600 hover:bg-rose-500 text-white"
	inputToReturn={`<input type="text" name="name" readonly id="name" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		name != undefined ? name.value : null
	}" required placeholder="Name"/> <input type="text" readonly name="xmlns" id="xmlns" class="mt-2 pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		xmlns != undefined ? xmlns.value : null
	}" required placeholder="XMLNS"/> <input type="text" readonly name="class" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		cls != undefined ? cls.value : null
	}" id="class" placeholder="Class"/> <input type="text" readonly name="viewBox" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		viewBox != undefined ? viewBox.value : null
	}" id="viewBox" required placeholder="ViewBox"/> <input type="text" readonly name="path" id="path" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		path != undefined ? path.value : null
	}" required placeholder="Path"/> <input type="text" readonly name="style" id="style" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		style != undefined ? style.value : null
	}" placeholder="Style"/> <input type="text" readonly name="_id" id="_id" class="pr-2 mt-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-2 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500" value="${
		_id != undefined ? _id.value : null
	}" placeholder="ID" readonly class=""/>`}
/>
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
<div class="w-full px-10 max-md:px-0 py-0 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		<div class="col-span-full grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
			<div
				class="col-span-full rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none"
			>
				<div class="data-container">
					<div
						class="max-h-[30rem] max-md:h-[15rem] dark:dark-scroll p-5 grid grid-flow-row grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-5 overflow-auto"
					>
						{#each data.parsedRole as { name, cls, path, viewBox, xmlns, style, permissions, _id }, idx}
							{@html `<button
								class="col-span-1 flex w-full pr-2 bg-base-200 shadow-lg drop-shadow-lg dark:shadow-none shadow-slate-500 rounded-md"
								id="${_id}"
							>
								<svg xmlns="${xmlns}" class="${cls.toString()} w-1/3 rounded-md" viewBox="${viewBox}" style="${style.toString()}">
									${path}
								</svg>
								<h2 class="card-title h-full flex align-middle">${name}</h2>
								${createPermsEl(permissions)}
							</button>`}
						{/each}
					</div>
					<div class="divider mx-20 max-md:mx-5" />
					<form
						action="roles?/create"
						method="post"
						id="formRole"
						class="grid grid-cols-2 grid-flow-row gap-2 w-full mb-5 max-md:px-2 max-lg:px-2 max-xl:px-5 px-16 mt-5 relative"
					>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Input Name</span>
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
									bind:this={name}
									class="pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
								/>
							</label>
						</div>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Input XMLNS</span>
							<label
								class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									><path
										d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
									/><path d="M11 11h2v6h-2zm0-4h2v2h-2z" /></svg
								>
								<input
									type="text"
									name="xmlns"
									id="xmlns"
									required
									placeholder="XMLNS"
									bind:this={xmlns}
									class="pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
								/>
							</label>
						</div>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Input Class</span>
							<label
								class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									><path
										d="M9 22h1v-2h-.989C8.703 19.994 6 19.827 6 16c0-1.993-.665-3.246-1.502-4C5.335 11.246 6 9.993 6 8c0-3.827 2.703-3.994 3-4h1V2H8.998C7.269 2.004 4 3.264 4 8c0 2.8-1.678 2.99-2.014 3L2 13c.082 0 2 .034 2 3 0 4.736 3.269 5.996 5 6zm13-11c-.082 0-2-.034-2-3 0-4.736-3.269-5.996-5-6h-1v2h.989c.308.006 3.011.173 3.011 4 0 1.993.665 3.246 1.502 4-.837.754-1.502 2.007-1.502 4 0 3.827-2.703 3.994-3 4h-1v2h1.002C16.731 21.996 20 20.736 20 16c0-2.8 1.678-2.99 2.014-3L22 11z"
									/></svg
								>
								<input
									type="text"
									name="class"
									id="class"
									placeholder="Class"
									bind:this={cls}
									class="pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
								/>
							</label>
						</div>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Input ViewBox</span>
							<label
								class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									viewBox="0 0 24 24"
									><path
										d="M4 21h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2V7h16l.001 12H4z"
									/></svg
								>
								<input
									type="text"
									name="viewBox"
									id="viewBox"
									required
									placeholder="ViewBox"
									bind:this={viewBox}
									class="pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
								/>
							</label>
						</div>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Full Path Tag and Attributes</span>
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
									name="path"
									id="path"
									required
									placeholder="Path"
									bind:this={path}
									class="pr-2 font-[Quicksand] text-black dark:text-white w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent dark:border-emerald-500"
								/>
							</label>
						</div>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Style</span>
							<label
								class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="absolute left-2 top-0 w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									><path
										d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z"
									/></svg
								>
								<input
									type="text"
									name="style"
									id="style"
									placeholder="Style"
									bind:this={style}
									class="pr-2 font-[Quicksand] text-black dark:text-white w-full
									h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2
									dark:bg-transparent dark:border-emerald-500"
								/>
							</label>
						</div>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Assign Permission</span>
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
								<select
									class="pr-2 font-[Quicksand] text-black dark:text-white w-full
									h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2
									dark:bg-[#1e293b] dark:border-emerald-500 dark:placeholder-emerald-600"
									bind:value={selectedPermsVal}
									on:change={() => {
										createInputPerms(selectedPermsVal);
									}}
									id="selectPerms"
								>
									<option selected>Select Permission</option>
									{#each data.permissions as { _id, name, code, created_by, created_at, updated_by, updated_at }, idx}
										<option value={_id}>{name}</option>
									{/each}
								</select>
							</label>
						</div>
						<div class="col-span-1 relative max-md:col-span-full">
							<span class="text-left font-[Quicksand] font-bold">Assign Permission</span>

							<div
								class="font-[Quicksand] text-black dark:text-white w-full
								h-9 px-3 ml-0 input input-bordered rounded-md border-solid border-2
								dark:bg-[#1e293b] dark:border-emerald-500 dark:placeholder-emerald-600 flex align-middle py-1 gap-1 overflow-auto"
								id="permissionsContainer"
							/>
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
									bind:this={_id}
									class="pr-2 font-[Quicksand] read-only:border-gray-300 dark:read-only:border-emerald-900
									 read-only:text-gray-500 dark:read-only:text-gray-400 text-black dark:text-white
									 w-full h-9 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent
									dark:border-emerald-500"
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
								formaction="roles?/update"
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
									cleanInputRole();

									if (_id != null) roleButtonConditions(_id);
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
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
</style>

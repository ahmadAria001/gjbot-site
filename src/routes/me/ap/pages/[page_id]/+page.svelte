<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_TITLE } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	const getAccOpt = (_id: string, target: string) => {
		let isSelected = false;

		if (_id === target) isSelected = true;

		return isSelected;
	};
	const getUpdOpt = (_id: string, target: string) => {
		let isSelected = false;

		if (_id === target) isSelected = true;
		return isSelected;
	};
	const getDelOpt = (_id: string, target: string) => {
		let isSelected = false;

		if (_id === target) isSelected = true;
		return isSelected;
	};

	const handleRoleClick = (evt: Event) => {
		let target: HTMLButtonElement;
		target = evt.currentTarget as HTMLButtonElement;

		let targetRole = data.roles.find((val: any) => val._id == target.getAttribute('id'));

		let accessCb = <HTMLInputElement>document.getElementById('access');
		let updateCb = <HTMLInputElement>document.getElementById('update');
		let deleteCb = <HTMLInputElement>document.getElementById('delete');
		let adminCb = <HTMLInputElement>document.getElementById('admin');

		let accessPerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.access ? true : false
		);
		let updatePerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.update ? true : false
		);
		let deletePerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.delete ? true : false
		);
		let adminPerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.absolute ? true : false
		);

		accessCb.checked = accessPerm.includes(true);
		updateCb.checked = updatePerm.includes(true);
		deleteCb.checked = deletePerm.includes(true);
		adminCb.checked = adminPerm.includes(true);
	};
	const handleUserClick = (evt: Event) => {
		let target: HTMLButtonElement;
		target = evt.currentTarget as HTMLButtonElement;

		let targetRole = data.roles.find((val: any) => val._id == target.getAttribute('id'));

		let accessCb = <HTMLInputElement>document.getElementById('access');
		let updateCb = <HTMLInputElement>document.getElementById('update');
		let deleteCb = <HTMLInputElement>document.getElementById('delete');
		let adminCb = <HTMLInputElement>document.getElementById('admin');

		let accessPerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.access ? true : false
		);
		let updatePerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.update ? true : false
		);
		let deletePerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.delete ? true : false
		);
		let adminPerm = targetRole.permissions.map((val: any) =>
			val._id === data.pageData.absolute ? true : false
		);

		accessCb.checked = accessPerm.includes(true);
		updateCb.checked = updatePerm.includes(true);
		deleteCb.checked = deletePerm.includes(true);
		adminCb.checked = adminPerm.includes(true);
	};

	onMount(() => {
		let pagePath = <HTMLInputElement>document.getElementById('path');
		let pageTitle = <HTMLInputElement>document.getElementById('title');
		let pageId = <HTMLInputElement>document.getElementById('_id');

		pagePath.setAttribute('value', data.pageData.path);
		pageTitle.setAttribute('value', data.pageData.title);
		pageId.setAttribute('value', data.pageID);

		if (browser) document.title = PUBLIC_TITLE + ' | Page Access';
	});
</script>

<div class="w-full px-10 max-md:px-0 py-0 flex justify-center align-middle dark:dark-scroll">
	<div class="grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll">
		<div class="col-span-full grid grid-flow-row grid-cols-4 w-full gap-5 dark:dark-scroll pt-2">
			<div
				class="col-span-full max-h-[40rem] rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none overflow-auto px-5 py-2"
			>
				<form
					action="{data.pageID}?/mainPerm"
					method="post"
					id="formRole"
					class="grid grid-cols-2 grid-flow-row gap-2 w-full mb-5 max-md:px-2 max-lg:px-2 max-xl:px-5 px-16 mt-5 relative"
				>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">Access Permission</span>
						<label
							class="relative w-full max-md:w-full flex max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-[0.4rem] w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"
								/><path
									d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"
								/><path
									d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"
								/></svg
							>
							<select
								class="pr-2 font-[Quicksand] text-black dark:text-white w-full
                        h-9 pl-11 ml-0 select select-bordered rounded-md border-solid border-2
                        dark:bg-[#1e293b] dark:border-emerald-500 dark:placeholder-emerald-600"
								name="accessPerm"
								id="accessPerm"
								required
							>
								{#each data.permissions as { _id, name }, idx}
									<option value={_id} id={_id} selected={getAccOpt(_id, data.pageData.access)}
										>{name}</option
									>
								{/each}
							</select>
						</label>
					</div>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">Update Permission</span>
						<label
							class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-[0.4rem] w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
								/><path d="M11 11h2v6h-2zm0-4h2v2h-2z" /></svg
							>
							<select
								class="pr-2 font-[Quicksand] text-black dark:text-white w-full
                        h-9 pl-11 ml-0 select select-bordered rounded-md border-solid border-2
                        dark:bg-[#1e293b] dark:border-emerald-500 dark:placeholder-emerald-600"
								name="deletePerm"
								id="deletePerm"
								required
							>
								{#each data.permissions as { _id, name }, idx}
									<option value={_id} id={_id} selected={getUpdOpt(_id, data.pageData.update)}
										>{name}</option
									>
								{/each}
							</select>
						</label>
					</div>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">Delete Permission</span>
						<label
							class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-[0.4rem] w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M9 22h1v-2h-.989C8.703 19.994 6 19.827 6 16c0-1.993-.665-3.246-1.502-4C5.335 11.246 6 9.993 6 8c0-3.827 2.703-3.994 3-4h1V2H8.998C7.269 2.004 4 3.264 4 8c0 2.8-1.678 2.99-2.014 3L2 13c.082 0 2 .034 2 3 0 4.736 3.269 5.996 5 6zm13-11c-.082 0-2-.034-2-3 0-4.736-3.269-5.996-5-6h-1v2h.989c.308.006 3.011.173 3.011 4 0 1.993.665 3.246 1.502 4-.837.754-1.502 2.007-1.502 4 0 3.827-2.703 3.994-3 4h-1v2h1.002C16.731 21.996 20 20.736 20 16c0-2.8 1.678-2.99 2.014-3L22 11z"
								/></svg
							>
							<select
								class="pr-2 font-[Quicksand] text-black dark:text-white w-full
                        h-9 pl-11 ml-0 select select-bordered rounded-md border-solid border-2
                        dark:bg-[#1e293b] dark:border-emerald-500 dark:placeholder-emerald-600"
								name="updatePerm"
								id="updatePerm"
								required
							>
								{#each data.permissions as { _id, name }, idx}
									<option value={_id} id={_id} selected={getDelOpt(_id, data.pageData.delete)}
										>{name}</option
									>
								{/each}
							</select>
						</label>
					</div>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">ID</span>
						<label
							class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-[0.4rem] w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
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
								class="pr-2 font-[Quicksand] read-only:border-gray-300 dark:read-only:border-emerald-900
                         read-only:text-gray-500 dark:read-only:text-gray-400 text-black dark:text-white
                         w-full h-12 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent
                        dark:border-emerald-500"
							/>
						</label>
					</div>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">Title</span>
						<label
							class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-[0.4rem] w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M8.293 6.293 2.586 12l5.707 5.707 1.414-1.414L5.414 12l4.293-4.293zm7.414 11.414L21.414 12l-5.707-5.707-1.414 1.414L18.586 12l-4.293 4.293z"
								/></svg
							>
							<input
								type="text"
								name="title"
								id="title"
								placeholder="ID"
								disabled
								class="pr-2 font-[Quicksand] read-only:border-gray-300 dark:read-only:border-emerald-900
                         read-only:text-gray-500 dark:read-only:text-gray-400 text-black dark:text-white
                         w-full h-12 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent
                        dark:border-emerald-500"
							/>
						</label>
					</div>
					<div class="col-span-1 relative max-md:col-span-full">
						<span class="text-left font-[Quicksand] font-bold">Path</span>
						<label
							class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-[0.4rem] w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M8.293 6.293 2.586 12l5.707 5.707 1.414-1.414L5.414 12l4.293-4.293zm7.414 11.414L21.414 12l-5.707-5.707-1.414 1.414L18.586 12l-4.293 4.293z"
								/></svg
							>
							<input
								type="text"
								name="path"
								id="path"
								placeholder="ID"
								disabled
								class="pr-2 font-[Quicksand] read-only:border-gray-300 dark:read-only:border-emerald-900
                         read-only:text-gray-500 dark:read-only:text-gray-400 text-black dark:text-white
                         w-full h-12 pl-11 ml-0 input input-bordered rounded-md border-solid border-2 dark:bg-transparent
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
							Confirm
						</button>
					</div>
				</form>
			</div>
			<div
				class="col-span-full max-h-[23rem] max-md:max-h-fit grid grid-cols-6 grid-flow-row rounded-lg bg-slate-100 dark:bg-[#1e293b] shadow-lg drop-shadow-md shadow-slate-700 dark:shadow-none overflow-auto"
			>
				<aside class="col-span-1 h-full max-md:col-span-full py-[0.05rem]">
					<ul
						class="menu bg-slate-700 text-white rounded-none transition-all duration-200 ease-linear w-full h-[10.385rem] max-h-[50%] max-md:max-h-[50%] overflow-hidden"
					>
						<li>
							<h2 class="menu-title text-lg max-md:text-md text-white">Roles</h2>
							<ul class="overflow-auto dark:dark-scroll max-h-28">
								{#each data.roles as { name, _id, style, path, viewBox, xmlns, cls }, idx}
									<li>
										<button
											id={_id}
											{style}
											class="text-sm hover:text-blue-300 dark:hover:text-emerald-400"
											on:click={(evt) => handleRoleClick(evt)}
										>
											{@html `<svg xmlns="${xmlns}" class="${cls} w-4" viewBox="${viewBox}" style="${style}">
												${path}
											</svg>`}
											{name}
										</button>
									</li>
								{/each}
							</ul>
						</li>
					</ul>
					<hr />
					<ul
						class="menu bg-slate-700 text-white rounded-none transition-all duration-200 ease-linear w-full h-[10.385rem] max-h-[50%] max-md:max-h-[50%] overflow-hidden"
					>
						<li>
							<h2 class="menu-title text-lg max-md:text-md text-white">User</h2>
							<ul class="overflow-auto dark:dark-scroll max-h-28">
								{#each data.users as { name, _id }, idx}
									<li>
										<button id={_id} class="text-lg hover:text-blue-300 dark:hover:text-emerald-400"
											>{name}</button
										>
									</li>
								{/each}
							</ul>
						</li>
					</ul>
				</aside>
				<form
					action="{data.pageID}?/mainPerm"
					method="post"
					id="formRole"
					class="col-span-5 max-md:col-span-full grid grid-cols-2 grid-flow-row gap-2 w-full mb-5 max-md:px-2 max-lg:px-2 max-xl:px-5 px-16 mt-5 relative text-white"
				>
					<div class="col-span-1 relative max-md:col-span-full rounded-lg bg-slate-700 p-2">
						<span class="text-left font-[Quicksand] font-bold ml-2">Access</span>
						<div class="w-full grid grid-cols-5 grid-flow-row gap-2">
							<div class="detail col-span-4 max-md:col-span-full flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									><path
										d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"
									/></svg
								>
								<p class="pt-1">Allow User to Access Page Content</p>
							</div>
							<div class="max-md:col-span-full col-span-1 flex max-md:justify-end align-middle">
								<input
									type="checkbox"
									name="access"
									id="access"
									class="toggle toggle-info dark:toggle-accent checked:bg-blue-500 checked:border-blue-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 toggle-lg"
								/>
							</div>
						</div>
					</div>
					<div class="col-span-1 relative max-md:col-span-full rounded-lg bg-slate-700 p-2">
						<span class="text-left font-[Quicksand] font-bold ml-2">Update</span>
						<div class="w-full grid grid-cols-5 grid-flow-row">
							<div class="detail col-span-4 flex max-md:col-span-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									><path
										d="M6 18h12v2H6zm6-14.414-6.707 6.707 1.414 1.414L11 7.414V16h2V7.414l4.293 4.293 1.414-1.414z"
									/></svg
								>
								<p class="pt-1">Allow User to Update Page Content</p>
							</div>
							<div class="max-md:col-span-full col-span-1 flex max-md:justify-end align-middle">
								<input
									type="checkbox"
									name="update"
									id="update"
									class="toggle toggle-info dark:toggle-accent checked:bg-blue-500 checked:border-blue-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 toggle-lg"
								/>
							</div>
						</div>
					</div>
					<div class="col-span-1 relative max-md:col-span-full rounded-lg bg-slate-700 p-2">
						<span class="text-left font-[Quicksand] font-bold ml-2">Delete</span>
						<div class="w-full grid grid-cols-5 grid-flow-row">
							<div class="detail col-span-4 flex max-md:col-span-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									><path
										d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
									/><path d="M9 10h2v8H9zm4 0h2v8h-2z" /></svg
								>
								<p class="pt-1">Allow User to Delete Page Content</p>
							</div>
							<div class="max-md:col-span-full col-span-1 flex max-md:justify-end align-middle">
								<input
									type="checkbox"
									name="delete"
									id="delete"
									class="toggle toggle-info dark:toggle-accent checked:bg-blue-500 checked:border-blue-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 toggle-lg"
								/>
							</div>
						</div>
					</div>
					<div class="col-span-1 relative max-md:col-span-full rounded-lg bg-slate-700 p-2">
						<span class="text-left font-[Quicksand] font-bold ml-2">Administrator</span>
						<div class="w-full grid grid-cols-5 grid-flow-row">
							<div class="detail col-span-4 flex max-md:col-span-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
									><path
										d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
									/><path d="M9 10h2v8H9zm4 0h2v8h-2z" /></svg
								>
								<p class="pt-1">Administrator</p>
							</div>
							<div class="max-md:col-span-full col-span-1 flex max-md:justify-end align-middle">
								<input
									type="checkbox"
									name="admin"
									id="admin"
									onclick="return false;"
									class="toggle toggle-info dark:toggle-accent checked:bg-blue-500 checked:border-blue-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 toggle-lg"
								/>
							</div>
						</div>
					</div>
					<div class="col-span-full relative rounded-lg bg-slate-700 p-2">
						<span class="text-left font-[Quicksand] font-bold ml-2">ID</span>
						<label
							class="relative flex w-full max-md:w-full max-lg:w-full max-xl:w-full row-span-2 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="absolute left-2 top-[0.4rem] w-9 pt-[0.4rem] pr-2 text-left p-1 fill-slate-400"
								><path
									d="M8.293 6.293 2.586 12l5.707 5.707 1.414-1.414L5.414 12l4.293-4.293zm7.414 11.414L21.414 12l-5.707-5.707-1.414 1.414L18.586 12l-4.293 4.293z"
								/></svg
							>
							<input
								type="text"
								name="_id"
								id="_id"
								readonly
								class="pr-2 font-[Quicksand] dark:read-only:text-gray-400 text-black dark:text-white
                         		w-full h-12 pl-11 ml-0 input input-bordered rounded-md border-2 dark:bg-transparent border-none bg-transparent"
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
							Confirm
						</button>
						<button
							type="reset"
							class="mt-1 mb-2 text-white w-fit max-md:w-full px-10 transition-all duration-150
                 bg-blue-600 hover:bg-blue-500 dark:hover:bg-emerald-600 dark:hover:text-white
                 dark:bg-transparent dark:border-solid dark:border-2 dark:text-emerald-400
                  dark:border-emerald-400 dark:hover:shadow-emerald-500 dark:hover:border-emerald-500 dark:shadow-lg
                   dark:drop-shadow-md h-10 rounded-xl font-[Roboto] font-extrabold dark:disabled:shadow-none
                   disabled:bg-transparent disabled:hover:bg-transparent disabled:text-emerald-800 disabled:hover:text-gray-600"
							id="submit"
						>
							Reset
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

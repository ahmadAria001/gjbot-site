<script lang="ts">
	import { afterNavigate, invalidateAll } from '$app/navigation';

	let gjIcn: any;
	let isAuthorized = $page.data.authorized || false;
	// let isAuthorized = true;
	let username: string | null = '' || null;

	export { gjIcn, isAuthorized, username };

	import { page } from '$app/stores';

	$: {
		gjIcn, isAuthorized, username;
	}

	if (username != null) isAuthorized = true;
</script>

<nav class="bg-transparent flex justify-center align-middle fixed top-0 z-50 w-full" id="navbar">
	<div class="navbar bg-blue-600 dark:bg-emerald-600 text-white w-[98%] mt-3 rounded-md">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="/">GJ Bot</a>
		</div>
		<div class="flex-none gap-5">
			<div class="dropdown dropdown-end">
				{#if isAuthorized}
					<button class="btn btn-ghost btn-circle avatar group/avatar">
						<div class="w-10 rounded-full">
							<img src={gjIcn} alt="User-Avatar" class="z-40 rounded-full absolute" />
							<div
								class="bg-white transition-all duration-300 origin-bottom rounded-full w-[115%] scale-0 group-hover/avatar:scale-100 group-focus-within/avatar:scale-100 h-[115%] absolute top-0 left-0 z-0"
							/>
						</div>
					</button>
					<ul
						class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-blue-700 dark:bg-emerald-600 rounded-md w-52 text-lg font-semibold"
					>
						<h5 class="text-end mx-2 pb-2 border-b-2 border-solid border-slate-300">
							{username}
						</h5>
						<li>
							<a class="hover:text-white text-white group/profilelink transition-all duration-200 ease-in" href="">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-6 fill-white group-hover/profilelink:fill-white transition-all duration-200 ease-in"
									><path
										d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
									/></svg
								>
								<span class="pb-1 relative before:content-[''] before:absolute before:block before:w-12 before:h-[2px]
                                before:bottom-0 before:left-0 before:bg-white
                                before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                before:transition before:ease-in-out before:duration-300"> Dashboard </span>
							</a>
						</li>
						<li>
							<a class="hover:text-white text-white group/profilelink transition-all duration-200 ease-in" href="">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-6 fill-white group-hover/profilelink:fill-white transition-all duration-200 ease-in"
									><path
										d="M20 12a2 2 0 0 0-.703.133l-2.398-1.963c.059-.214.101-.436.101-.67C17 8.114 15.886 7 14.5 7S12 8.114 12 9.5c0 .396.1.765.262 1.097l-2.909 3.438A2.06 2.06 0 0 0 9 14c-.179 0-.348.03-.512.074l-2.563-2.563C5.97 11.348 6 11.179 6 11c0-1.108-.892-2-2-2s-2 .892-2 2 .892 2 2 2c.179 0 .348-.03.512-.074l2.563 2.563A1.906 1.906 0 0 0 7 16c0 1.108.892 2 2 2s2-.892 2-2c0-.237-.048-.46-.123-.671l2.913-3.442c.227.066.462.113.71.113a2.48 2.48 0 0 0 1.133-.281l2.399 1.963A2.077 2.077 0 0 0 18 14c0 1.108.892 2 2 2s2-.892 2-2-.892-2-2-2z"
									/></svg
								>
								<span class="pb-1 relative before:content-[''] before:absolute before:block before:w-12 before:h-[2px]
                                before:bottom-0 before:left-0 before:bg-white
                                before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                before:transition before:ease-in-out before:duration-300"> Analystic </span>
							</a>
						</li>
						<li>
							<a class="hover:text-white text-white group/profilelink transition-all duration-200 ease-in" href="">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-6 fill-white group-hover/profilelink:fill-white transition-all duration-200 ease-in"
									><path
										d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2z"
									/><path
										d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"
									/></svg
								>
								<span class="pb-1 relative before:content-[''] before:absolute before:block before:w-12 before:h-[2px]
                                before:bottom-0 before:left-0 before:bg-white
                                before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                before:transition before:ease-in-out before:duration-300"> Conversations </span>
							</a>
						</li>

						<li class="mt-2">
							<a
								class="hover:text-white text-white group/profilelink transition-all duration-200 ease-in"
								href=""
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-6 fill-white group-hover/profilelink:fill-white transition-all duration-200 ease-in"
									><path
										d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"
									/></svg
								>
								<span
									class="pb-1 relative before:content-[''] before:absolute before:block before:w-12 before:h-[2px]
                                before:bottom-0 before:left-0 before:bg-white
                                before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                before:transition before:ease-in-out before:duration-300"
								>
									Profile
								</span>
							</a>
						</li>
						<li>
							<a
								href=""
								class="text-white hover:text-white group/setting transition-all duration-200 ease-in"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-6 fill-white transition-all duration-200 ease-in"
									><path
										d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"
									/></svg
								>
								<span
									class="pb-1 relative before:content-[''] before:absolute before:block before:w-14 before:h-[2px]
                                before:bottom-0 before:left-0 before:bg-white
                                before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                before:transition before:ease-in-out before:duration-300"
								>
									Settings
								</span>
							</a>
						</li>
						<li>
							<a href="" class="hover:text-white group/signout transition-all duration-200 ease-in">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-6 group-hover/signout:fill-white fill-white transition-all duration-200 ease-in"
									><path
										d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"
									/><path d="M11 2h2v10h-2z" /></svg
								>
								<span
									class="pb-1 relative before:content-[''] before:absolute before:block before:w-16 before:h-[2px]
                                before:bottom-0 before:left-0 before:bg-white
                                before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                before:transition before:ease-in-out before:duration-300"
								>
									Sign Out
								</span>
							</a>
						</li>
					</ul>
				{:else}
					<ul class="bg-base-100 rounded-box w-fit bg-transparent">
						<li>
							<a
								href="/signin"
								class="hover:bg-[#3f72e1] dark:hover:bg-emerald-500 px-5 py-2 rounded-lg flex transition-all duration-150 ease-in"
							>
								<span> Sign In </span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="w-7 ml-2 fill-white"
									><path
										d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z"
									/></svg
								>
							</a>
						</li>
					</ul>
				{/if}
			</div>
		</div>
	</div>
</nav>

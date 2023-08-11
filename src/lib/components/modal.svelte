<script lang="ts">
	let title: string,
		desc: any,
		confirm: string,
		id: string,
		formAction: string,
		methode: 'get' | 'post',
		inputToReturn: string,
		style: string;

	export { title, desc, confirm, id, formAction, methode, inputToReturn, style };
</script>

<dialog {id} class="modal">
	<form class="modal-box" action={formAction} method={methode}>
		<h3 class="font-bold text-lg">{title}</h3>
		<p class="py-4 text-md">{desc}</p>
		<div class="block">
			{@html inputToReturn}
		</div>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal  bg-green-600 hover:bg-green-500 -->
			<button class="btn {style}">{confirm}</button>
		</div>
		<p class="text-gray-600">ESC to Close OR Click / Tap Outside the panel</p>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

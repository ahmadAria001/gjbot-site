export const load = async ({ fetch, locals }) => {
	let responseSelfTalk;
	let resultSelfTalk;

	try {
		responseSelfTalk = await fetch('/api/controller/conversations/me', {
			method: 'POST',
			body: JSON.stringify({ id: locals.user.id })
		});

		resultSelfTalk = await responseSelfTalk.json();
	} catch (error) {
		console.error(error);
	}

	return { conv: resultSelfTalk.content };
};

export const actions = {
	submitpromp: async ({ request, fetch }) => {
		const data = await request.formData();
		const prompt = data.get('prompt')?.toString();

		const response = await fetch('/api/controller/conversations/completions', {
			method: 'POST',
			body: JSON.stringify({ prompt: prompt })
		});

		const result = await response.json();

		let { promptData, isErr, message } = result;

		return { promptData: promptData, isErr: isErr, message: message };

		// interface retVal {
		// 	isErr: false;
		// 	message: string | null;
		// 	promptData: {
		// 		sender: 'user' | 'system';
		// 		content: string;
		// 		created_at: number;
		// 	};
		// }

		// let res: retVal = {
		// 	promptData: {
		// 		sender: 'user' || 'system',
		// 		content: 'Hello, World!',
		// 		created_at: 1689249195744
		// 	},
		// 	isErr: false,
		// 	message: null
		// };

		// res.promptData = {
		// 	sender: 'system',
		// 	content: prompt!,
		// 	created_at: 1689249195744
		// };

		// return { promptData: res.promptData, isErr: res.isErr, message: res.message };
	}
};

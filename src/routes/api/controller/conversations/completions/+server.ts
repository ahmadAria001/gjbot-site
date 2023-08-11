import {
	createConversation,
	getTalkLimit,
	streamToString
} from '$lib/server/models/conversations.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals, url }) => {
	if (!['localhost', '192.168.0.122'].includes(url.hostname))
		return json({ promptData: null, isErr: true, message: 'Forbidden' });

	if (locals.user.id == null) {
		return json({ promptData: null, isErr: true, message: 'Unauthorized' });
	}

	const formData = await request.json();
	const prompt = formData.prompt;

	let lastChats = await getTalkLimit(locals.user.id, 5);

	let prompContainer: { role: 'user' | 'system'; content: string }[] = [];

	if (lastChats.value != null) {
		for (let i = lastChats.value.length - 1; i >= 0; i--) {
			prompContainer.push({ role: lastChats.value[i].sender, content: lastChats.value[i].content });
		}
	}

	prompContainer.push({ content: prompt, role: 'user' });

	let response = await createConversation(prompContainer, prompt, locals.user.id);

	let arrayFormResponse = streamToString(response);

	if (response.hasOwnProperty('content')) {
		return json({ promptData: null, isErr: true, message: response.content });
	}
	return json({
		promptData: { content: arrayFormResponse, sender: 'system', created_at: Date.now() },
		isErr: false,
		message: null
	});
	// return json({ promptData: null, isErr: false, message: null });
};

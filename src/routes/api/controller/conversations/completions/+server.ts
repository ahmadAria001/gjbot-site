import {
	createConversation,
	getTalkLimit,
	streamToString
} from '$lib/server/models/conversations.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals, fetch }) => {
	const formData = await request.json();
	const prompt = formData.prompt;

	let lastChats = await getTalkLimit(locals.user.id, 5);

	let prompContainer: { role: 'user' | 'system'; content: string }[] = [];

	for (let i = lastChats.value.length - 1; i >= 0; i--) {
		prompContainer.push({ role: lastChats.value[i].sender, content: lastChats.value[i].content });
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

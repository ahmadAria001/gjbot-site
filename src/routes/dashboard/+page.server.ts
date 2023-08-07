import { timeSince } from '$lib/functions/dateFormat.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch }) => {
	if (locals.user.id == null) throw redirect(303, '/signin');

	let userId = locals.user.id;

	let responseCurrentToken;
	let responseSelfTalk;
	let responseTotalToken;

	let resultCurrentToken;
	let resultSelfTalk;
	let resultTotalToken;

	let lastTok;
	let isO = false;

	try {
		responseSelfTalk = await fetch('/api/controller/conversations/me', {
			method: 'POST',
			body: JSON.stringify({ id: userId })
		});

		resultSelfTalk = await responseSelfTalk.json();
	} catch (error) {
		console.error(error);
	}

	try {
		responseCurrentToken = await fetch('/api/controller/tokens/me', {
			method: 'POST',
			body: JSON.stringify({ id: userId })
		});

		resultCurrentToken = await responseCurrentToken.json();
	} catch (error) {
		console.error(error);
	}

	try {
		responseTotalToken = await fetch('/api/controller/tokens/sum', {
			method: 'POST',
			body: JSON.stringify({ id: userId })
		});

		resultTotalToken = await responseTotalToken.json();
	} catch (error) {
		console.error(error);
	}

	if (userId == '591622658177630210') {
		try {
			responseTotalToken = await fetch('/api/controller/tokens', {
				method: 'GET'
			});
			resultTotalToken = await responseTotalToken.json();

			isO = true;
		} catch (error) {
			console.error(error);
		}
	}

	lastTok = await lastToken(resultSelfTalk.content);

	return {
		historyChat:
			resultSelfTalk.content != null
				? resultSelfTalk.content.filter((val: any) => val.sender == 'user').splice(0, 5)
				: resultSelfTalk.content,
		currentToken: resultCurrentToken.content,
		totalToken: resultTotalToken.content,
		historyToken: lastTok,
		isO: isO
	};
};

const lastToken = async (params: any) => {
	let promissed = await params;

	let result = [{ day: 'd-m-yyyy', token: 0 }];

	result.pop();

	if (params == null || params.length < 1) return result;

	promissed.map((value: any) => {
		if (value.sender == 'system') {
			let day = new Date(value.created_at).toDateString();
			if (result.find((val) => val.day.includes(day)) == null)
				result.push({ day: day, token: value.token });
			else
				result.find((val) => {
					if (val.day.includes(day)) val.token += value.token;
				});
		}
	});

	result.map((value) => {
		value.day = timeSince(new Date(value.day).getTime());
	});

	return result;
};

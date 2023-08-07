import { getAllTalk, getTalk } from '$lib/server/models/conversations.models.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ locals, url }) => {
	if (!['localhost', '192.168.0.122'].includes(url.hostname)) return json({ stat: 403, content: null });

	if (locals.user.id == null) return json({ stat: 401, content: null });

	let result = await getAllTalk();

	let tokenData = [
		{
			id: '' || null,
			uName: '' || null,
			datas: [
				{
					month: 'Jan',
					tokens: 0
				},
				{
					month: 'Feb',
					tokens: 0
				},
				{
					month: 'Mar',
					tokens: 0
				},
				{
					month: 'Apr',
					tokens: 0
				},
				{
					month: 'Mei',
					tokens: 0
				},
				{
					month: 'Jun',
					tokens: 0
				},
				{
					month: 'Jul',
					tokens: 0
				},
				{
					month: 'Aug',
					tokens: 0
				},
				{
					month: 'Sep',
					tokens: 0
				},
				{
					month: 'Oct',
					tokens: 0
				},
				{
					month: 'Nov',
					tokens: 0
				},
				{
					month: 'Des',
					tokens: 0
				}
			]
		}
	];

	tokenData.pop();

	if (result.value != null) {
		result.value.map((value: any) => {
			value.conversations.map((conv: any) => {
				if (
					conv.sender == 'system' &&
					new Date(conv.created_at).getFullYear() === new Date(Date.now()).getFullYear()
				) {
					if (!tokenData.some((element) => element.id == value._id || tokenData.length < 1)) {
						let userTokenData = [
							{
								month: 'Jan',
								tokens: 0
							},
							{
								month: 'Feb',
								tokens: 0
							},
							{
								month: 'Mar',
								tokens: 0
							},
							{
								month: 'Apr',
								tokens: 0
							},
							{
								month: 'Mei',
								tokens: 0
							},
							{
								month: 'Jun',
								tokens: 0
							},
							{
								month: 'Jul',
								tokens: 0
							},
							{
								month: 'Aug',
								tokens: 0
							},
							{
								month: 'Sep',
								tokens: 0
							},
							{
								month: 'Oct',
								tokens: 0
							},
							{
								month: 'Nov',
								tokens: 0
							},
							{
								month: 'Des',
								tokens: 0
							}
						];

						userTokenData[new Date(conv.created_at).getMonth()].tokens = conv.token;

						tokenData.push({
							id: value._id,
							uName: value.uname[0],
							datas: userTokenData
						});
					} else {
						let index = tokenData.indexOf(tokenData.find((el) => el.id == value._id)!);

						tokenData[index].datas[new Date(conv.created_at).getMonth()].tokens += conv.token;
					}
				}
			});
		});
	}

	// tokenData.map((val) => {
	// 	console.log('ID: ' + val.id);
	// 	console.log('User: ' + val.uName);
	// 	val.datas.map((el) => {
	// 		console.log(el);
	// 	});
	// });

	return json({ stat: 200, content: tokenData });
};

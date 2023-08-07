export const formatCode = (
	text: string,
	user: string,
	created_at: number
): { content: string[] | null; instance: string | null; created_at: number | null } => {
	if (text != undefined) {
		if (
			text?.includes('```') &&
			text.split('```').length == 3 &&
			text.split('```')[0] === '' &&
			text.split('```')[2] === ''
		) {
			let formattedContent = `<div class="mockup-code my-2 text-left rounded-lg" in:fly={{ y: -200, duration: 300, delay: 300 }} out:fly={{ y: 200, duration: 300 }}><pre><code>${text
				.toString()
				.replaceAll('```', '')}</code></pre></div>`;

			return { content: [formattedContent], instance: user, created_at: created_at };
		}

		if (text?.includes('```')) {
			let codedText = text.split('```');
			let formatCode: string[] = [];

			for (let i = 0; i < codedText.length; i++) {
				if (i % 2 == 1) {
					let containsHtml: string = '';
					if (codedText[i].includes('<')) {
						containsHtml = codedText[i].replaceAll('<', '&lt').replaceAll('>', '&gt');

						let containEnter = containsHtml.split(/\r?\n|\r|\n/g);
						let counter = 1;

						let formattedContent = `<div class="mockup-code my-2 text-left pr-1 w-full dark:dark-scroll text-slate-600 shadow-md shadow-slate-500 dark:shadow-none drop-shadow-md bg-[#f4f4f4] dark:bg-slate-800 dark:text-primary-content rounded-lg" in:fly={{ y: -200, duration: 300, delay: 300 }} out:fly={{ y: 200, duration: 300 }}>${containEnter
							.map((val) => {
								return `<pre data-prefix="${counter++}"><code>${val.toString()}</code></pre>`;
							})
							.join(' ')}</div>`;

						formatCode.push(formattedContent);
					} else {
						let containsHtml = codedText[i];
						let containEnter = containsHtml.split(/\r?\n|\r|\n/g);

						let formattedContent = `<div class="mockup-code my-2 text-left pr-1 w-full dark:dark-scroll text-slate-600 shadow-md shadow-slate-500 dark:shadow-none drop-shadow-md bg-[#f4f4f4] dark:bg-slate-800  dark:text-primary-content rounded-lg" in:fly={{ y: -200, duration: 300, delay: 300 }} out:fly={{ y: 200, duration: 300 }}>
                    ${containEnter
											.map((val, idx) => {
												return `<pre data-prefix="${
													codedText[i].includes('shell') ? (idx == 0 ? '$' : '&gt') : idx++
												}"><code>${
													// val.includes('shell') || val.includes('cli') || val.includes('bash')
													// 	? ''
													// 	: val.toString()
													val.toString()
												}</code></pre>`;
											})
											.join(' ')}
                                        </div>`;

						formatCode.push(formattedContent);
					}
				}

				if (codedText[i] != '' && i % 2 == 0 && codedText[i] != ' ') {
					let containsHtml = codedText[i].replaceAll('<', '&lt').replaceAll('>', '&gt');
					let href = '';

					let splitLine = text.split(/\r?\n|\r|\n/g);

					let title = '';
					let targetLink = '';

					if (
						splitLine[i].includes('[') &&
						splitLine[i].includes(']') &&
						splitLine[i].includes('(') &&
						splitLine[i].includes(')') &&
						splitLine[i].includes('/') &&
						!splitLine[i].includes('{')
					) {
						title = splitLine[i].substring(
							splitLine[i].indexOf('['),
							splitLine[i].indexOf(']') + 1
						);
						let titleReplaced = title.replaceAll('[', '').replaceAll(']', '');

						targetLink = splitLine[i].substring(
							splitLine[i].indexOf('('),
							splitLine[i].indexOf(')') + 1
						);
						let targetLinkReplaced = targetLink.replaceAll('(', '').replaceAll(')', '');

						href += `<strong><a href="${targetLinkReplaced}" class="hover:underline dark:text-[#e3d357] ${
							user == 'user' ? 'text-[#ffe311]' : 'text-blue-600'
						}">Link: ${titleReplaced}</a></strong/>`;
					}
					let containEnter;

					if (href != '') {
						containEnter = containsHtml
							.replaceAll(/\r?\n|\r|\n/g, '<br/>')
							.replace(title + targetLink, href);
					} else {
						containEnter = containsHtml.replaceAll(/\r?\n|\r|\n/g, '<br/>');
					}

					let bolded = containEnter;

					let isOpen = true;

					for (let idx = 0; idx < bolded.toString().length; idx++) {
						if (bolded.toString()[idx] == '`' && isOpen) {
							bolded = replaceCharacter(
								bolded,
								idx,
								'<strong class="dark:text-[#e3d357] text-blue-600">'
							);
							isOpen = false;
						}
						if (bolded.toString()[idx] == '`' && !isOpen) {
							bolded = replaceCharacter(bolded, idx, '</strong>');
							isOpen = true;
						}
					}

					formatCode.push(bolded);
				}
			}
			// console.log(formatCode);
			return { content: formatCode, instance: user, created_at: created_at };
		} else if (!text?.includes('```') && text?.includes('`')) {
			let containEnter: string[] = [];
			let splitted = text.replaceAll('<', '&lt').replaceAll('>', '&gt').split('`');

			let splitLine = text.split(/\r?\n|\r|\n/g);

			for (let i = 0; i < splitLine.length; i++) {
				let href = '';
				let title = '';
				let targetLink = '';

				if (
					splitLine[i].includes('[') &&
					splitLine[i].includes(']') &&
					splitLine[i].includes('(') &&
					splitLine[i].includes(')') &&
					splitLine[i].includes('/')
				) {
					title = splitLine[i].substring(splitLine[i].indexOf('['), splitLine[i].indexOf(']') + 1);
					let titleReplaced = title.replaceAll('[', '').replaceAll(']', '');

					targetLink = splitLine[i].substring(
						splitLine[i].indexOf('('),
						splitLine[i].indexOf(')') + 1
					);
					let targetLinkReplaced = targetLink.replaceAll('(', '').replaceAll(')', '');

					href += `<a href="${targetLinkReplaced}" class="dark:text-[#e3d357] ${
						user == 'user' ? 'text-[#ffe311]' : 'text-blue-600'
					}">${titleReplaced}</a>`;

					if (title != '' && targetLink != '' && href != '')
						splitLine[i].replace(title + targetLink, href);

					let targetIdx = splitted.findIndex((val) => val.indexOf(title + targetLink) !== -1);

					if (href != '')
						splitLine[targetIdx] = splitted[targetIdx].replace(title + targetLink, href);
				}
			}

			for (let i = 0; i < splitted.length; i++) {
				if (i % 2 == 1) {
					if (splitted[i] != '') {
						let bolded = text;
						if (!text?.includes('```') && text?.includes('`')) {
							bolded = splitted[i] = `<b class="dark:text-[#e3d357] ${
								user == 'user' ? 'text-[#ffe311]' : 'text-blue-600'
							}">${splitted[i]}</b>`;
						}

						containEnter.push(bolded.replaceAll(/\r?\n|\r|\n/g, '<br/>'));
					}
				} else {
					containEnter.push(splitted[i].replaceAll(/\r?\n|\r|\n/g, '<br/>'));
				}
			}

			// console.log(containEnter);
			return { content: containEnter, instance: user, created_at: created_at };
		} else {
			let containEnter = '';
			if (text != '') {
				let bolded = text.replaceAll('<', '&lt').replaceAll('>', '&gt');

				if (!text?.includes('```') && text?.includes('`')) {
					let chopped = text
						.replaceAll('<', '&lt')
						.replaceAll('>', '&gt')
						.substring(text.indexOf('`'), text.lastIndexOf('`'));
					bolded = text
						.replace(
							chopped,
							`<b class="dark:text-[#e3d357] ${
								user == 'user' ? 'text-[#ffe311]' : 'text-blue-600'
							}">${chopped.replaceAll('<', '&lt').replaceAll('>', '&gt').replaceAll('`', '')}</b>`
						)
						.replaceAll('`', '');
				}

				containEnter = bolded.replaceAll(/\r?\n|\r|\n/g, '<br/>');

				let splitLine = text.split(/\r?\n|\r|\n/g);

				for (let i = 0; i < splitLine.length; i++) {
					let href = '';
					let title = '';
					let targetLink = '';

					if (
						splitLine[i].includes('[') &&
						splitLine[i].includes(']') &&
						splitLine[i].includes('(') &&
						splitLine[i].includes(')') &&
						splitLine[i].includes('/') &&
						!splitLine[i].includes('{')
					) {
						title = splitLine[i].substring(
							splitLine[i].indexOf('['),
							splitLine[i].indexOf(']') + 1
						);
						let titleReplaced = title.replaceAll('[', '').replaceAll(']', '');

						targetLink = splitLine[i].substring(
							splitLine[i].indexOf('('),
							splitLine[i].indexOf(')') + 1
						);
						let targetLinkReplaced = targetLink.replaceAll('(', '').replaceAll(')', '');

						href += `<strong><a href="${targetLinkReplaced}" class="hover:underline dark:text-[#e3d357] ${
							user == 'user' ? 'text-[#ffe311]' : 'text-blue-600'
						}">Link: ${titleReplaced}</a></strong/>`;

						if (title != '' && targetLink != '' && href != '')
							splitLine[i].replace(title + targetLink, href);

						if (href != '') containEnter = containEnter.replace(title + targetLink, href);
					}
				}
			}

			// console.log(containEnter);
			return { content: [containEnter], instance: user, created_at: created_at };
		}
	}
	return { content: null, instance: null, created_at: null };
};

function replaceCharacter(string: string, index: number, replacement: string) {
	return string.slice(0, index) + replacement + string.slice(index + 1);
}

export const formatWords = (word: string, endAt: number, maxmd: boolean = false) => {
	let arrWords = word.split(' ');
	let trace;
	let final = [];

	if (!maxmd) {
		if (arrWords.length > endAt) {
			trace = arrWords.splice(endAt);

			for (let i = 0; i <= endAt; i++) {
				final.push(trace[i]);
			}

			return final.join(' ') + ' ...';
		}
	} else {
		if (arrWords.length > 3) {
			trace = arrWords.splice(3);

			for (let i = 0; i <= 3; i++) {
				final.push(trace[i]);
			}

			return final.join(' ') + ' ...';
		}
	}

	return word;
};

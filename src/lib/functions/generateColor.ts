export function getRandomLightColor() {
	return (
		'hsl(' +
		360 * Math.random() +
		',' +
		(25 + 70 * Math.random()) +
		'%,' +
		(60 + 40 * Math.random()) +
		'%)'
	);
}
export function getRandomDarkColor() {
	return (
		'hsl(' +
		360 * Math.random() +
		',' +
		(25 + 70 * Math.random()) +
		'%,' +
		(0 + 60 * Math.random()) +
		'%)'
	);
}

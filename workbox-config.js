module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{json,ico,html,txt,md,js,png,jpeg,svg,css,jsx}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
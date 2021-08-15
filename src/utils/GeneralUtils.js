


export const getRandomColor = () => {
	const potentialColors = [
		'#FF0000',
		'#008000',
		'#00FFFF',
		'#0000FF',
		'#FF00FF',
		'#DE3163',
		'#6495ED',
		'#CCCCFF'
	]

	return potentialColors[Math.floor(Math.random() * potentialColors.length)]
}


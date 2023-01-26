const arrayWith8Balls = new Array(8).fill(1)
const sentence = "Heavier position (from 1 to 8) is:"
function randomIndexForHeavierBall(arrayWith8Balls) {
	const randomIndex = Math.floor(Math.random() * 8)
	arrayWith8Balls[randomIndex] = 2
	return arrayWith8Balls
}
function weightOfSide(array, start, end) {
	return array.slice(start, end).reduce((sum, currentElement) => {
		return (sum += currentElement)
	}, 0)
}
function scale(array) {
	console.log(array)
	let weightOfLeft = weightOfSide(array, 0, 3)
	let weightOfMiddle = weightOfSide(array, 3, 6)
	if (weightOfLeft === weightOfMiddle) {
		if (array[6] > array[7]) {
			return `${sentence} 7`
		} else {
			return `${sentence} 8`
		}
	} else if (weightOfLeft > weightOfMiddle) {
		if (array[0] === array[1]) {
			return `${sentence} 3`
		} else if (array[0] > array[1]) {
			return `${sentence} 1`
		} else {
			return `${sentence} 2`
		}
	} else if (weightOfMiddle > weightOfLeft) {
		if (array[3] === array[4]) {
			return `${sentence} 6`
		} else if (array[3] > array[4]) {
			return `${sentence} 4`
		} else {
			return `${sentence} 5`
		}
	}
}
console.log(scale(randomIndexForHeavierBall(arrayWith8Balls)))

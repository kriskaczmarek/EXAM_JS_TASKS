// const board = new Array(9).fill(new Array(9).fill("_"))
// const randomNum1to9 = Math.floor(Math.random() * 10)
// console.log(randomNum1to9)
// console.log(board)

function createBoard() {
	let board = new Array(9).fill(new Array(9).fill("".repeat(9)))
	console.log(board)
}
createBoard()
function createRandomNumber1to9() {
	return Math.floor(Math.random() * 9) + 1
}
function createRandomPosition1to9() {
	return Math.floor(Math.random() * 9) + 1
}

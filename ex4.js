const sampleGrid = [
	[5, 3, 0, 0, 7, 0, 0, 0, 0],
	[6, 0, 0, 1, 9, 5, 0, 0, 0],
	[0, 9, 8, 0, 0, 0, 0, 6, 0],
	[8, 0, 0, 0, 6, 0, 0, 0, 3],
	[4, 0, 0, 8, 0, 3, 0, 0, 1],
	[7, 0, 0, 0, 2, 0, 0, 0, 6],
	[0, 6, 0, 0, 0, 0, 2, 8, 0],
	[0, 0, 0, 4, 1, 9, 0, 0, 5],
	[0, 0, 0, 0, 8, 0, 0, 7, 9],
]

const sudokuGrid = [
	[7, 0, 4, 8, 0, 0, 3, 0, 1],
	[8, 2, 0, 5, 0, 0, 0, 4, 0],
	[0, 0, 9, 4, 3, 0, 5, 0, 0],
	[3, 1, 0, 0, 0, 0, 8, 0, 7],
	[0, 8, 0, 0, 0, 0, 0, 1, 0],
	[9, 0, 7, 0, 0, 0, 0, 3, 2],
	[0, 0, 6, 0, 1, 5, 4, 0, 0],
	[0, 7, 0, 0, 0, 9, 0, 6, 5],
	[5, 0, 8, 0, 0, 2, 1, 0, 3],
]

function displaySudokuGrid(grid) {
	return console.log(`          Solution:
    | 1 2 3 | 4 5 6 | 7 8 9 |
  ===========================
  1 | ${grid[0][0]} ${grid[0][1]} ${grid[0][2]} | ${grid[0][3]} ${grid[0][4]} ${grid[0][5]} | ${grid[0][6]} ${grid[0][7]} ${grid[0][8]} |
  2 | ${grid[1][0]} ${grid[1][1]} ${grid[1][2]} | ${grid[1][3]} ${grid[1][4]} ${grid[1][5]} | ${grid[1][6]} ${grid[1][7]} ${grid[1][8]} |
  3 | ${grid[2][0]} ${grid[2][1]} ${grid[2][2]} | ${grid[2][3]} ${grid[2][4]} ${grid[2][5]} | ${grid[2][6]} ${grid[2][7]} ${grid[2][8]} |
  ===========================
  4 | ${grid[3][0]} ${grid[3][1]} ${grid[3][2]} | ${grid[3][3]} ${grid[3][4]} ${grid[3][5]} | ${grid[3][6]} ${grid[3][7]} ${grid[3][8]} |
  5 | ${grid[4][0]} ${grid[4][1]} ${grid[4][2]} | ${grid[4][3]} ${grid[4][4]} ${grid[4][5]} | ${grid[4][6]} ${grid[4][7]} ${grid[4][8]} |
  6 | ${grid[5][0]} ${grid[5][1]} ${grid[5][2]} | ${grid[5][3]} ${grid[5][4]} ${grid[5][5]} | ${grid[5][6]} ${grid[5][7]} ${grid[5][8]} |
  ===========================
  7 | ${grid[6][0]} ${grid[6][1]} ${grid[6][2]} | ${grid[6][3]} ${grid[6][4]} ${grid[6][5]} | ${grid[6][6]} ${grid[6][7]} ${grid[6][8]} |
  8 | ${grid[7][0]} ${grid[7][1]} ${grid[7][2]} | ${grid[7][3]} ${grid[7][4]} ${grid[7][5]} | ${grid[7][6]} ${grid[7][7]} ${grid[7][8]} |
  9 | ${grid[8][0]} ${grid[8][1]} ${grid[8][2]} | ${grid[8][3]} ${grid[8][4]} ${grid[8][5]} | ${grid[8][6]} ${grid[8][7]} ${grid[8][8]} |
  ===========================`)
}

//function checks whether is it possible to place a number in desired square
function valueChecker(grid, col, row, value) {
	let colArray = []

	grid.forEach(element => {
		colArray.push(element[col])
	})

	let subgridArray = []

	const subgridRow = Math.floor(row / 3) * 3
	const subgridCol = Math.floor(col / 3) * 3

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			subgridArray.push(grid[subgridRow + i][subgridCol + j])
		}
	}
	return !(
		grid[row].includes(value) ||
		colArray.includes(value) ||
		subgridArray.includes(value)
	)
}

//function finds first unfilled square in the given grid and returns its coordinates [row, col], if there are no unfilled squared it returns false
function findEmptySquare(grid) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (grid[i][j] === 0) {
				return [i, j]
			}
		}
	}
	return false
}

function sudokuSolver(grid) {
	//coordinates of the first unfilled square
	let emptySquare = findEmptySquare(grid)
	//if there are no empty squares we return the grid
	if (emptySquare === false) {
		return grid
	}
	let emptySqRow = emptySquare[0]
	let emptySqCol = emptySquare[1]

	for (let i = 1; i < 10; i++) {
		if (valueChecker(grid, emptySqCol, emptySqRow, i)) {
			grid[emptySqRow][emptySqCol] = i
			sudokuSolver(grid)
		}
		//if validation failed for the 1-10 values for desired square, it clears the square and moves to previous step to try another value
		if (findEmptySquare(grid)) {
			grid[emptySqRow][emptySqCol] = 0
		}
	}

	return grid
}

displaySudokuGrid(sudokuSolver(sudokuGrid))
displaySudokuGrid(sudokuSolver(sampleGrid))

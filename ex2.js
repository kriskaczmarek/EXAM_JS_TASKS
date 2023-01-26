const cardNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const cardColors = ["Hearts", "Clubs", "Diamonds", "Spades"]
function createDeck() {
	const deck = []
	cardNumbers.forEach(value =>
		cardColors.forEach(color => {
			deck.push(`${value} ${color}`)
		})
	)
	return deck
}
function shuffleCards(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		let randomNumberCardInDeck = Math.floor(Math.random() * i)
		let temporaryCard = deck[i]
		deck[i] = deck[randomNumberCardInDeck]
		deck[randomNumberCardInDeck] = temporaryCard
	}
	return deck
}
function myCardsfromDeck(deck) {
	let myFiveCardsFromDeck = []
	myFiveCardsFromDeck = deck.splice(0, 5)
	return myFiveCardsFromDeck
}
const deck = createDeck()
const shuffledDeck = shuffleCards(deck)
const myCards = myCardsfromDeck(shuffledDeck)
console.log("Players cards:|", myCards.join(" | "), "|")

function separateNumberandColor(myCards) {
	let colors = myCards.map(color => color.slice(2).trim())
	let numbers = myCards.map(number => Number(number.slice(0, 2)))
	return [numbers, colors]
}
function checkIfNextNumberIsGreaterByOne(array) {
	let b = false
	for (let i = 0; i < array.length - 1; i++) {
		if (array[i + 1] - array[i] === 1) {
			b = true
		} else {
			b = false
			return b
		}
	}
	return b
}
function checkIfAllSameNumbers(array) {
	let b = false
	for (let i = 0; i < array.length - 1; i++) {
		if (array[i + 1] === array[i]) {
			b = true
		} else {
			b = false
			return b
		}
	}
	return b
}
function cardFigures(number) {
	if (number > 10) {
		switch (number) {
			case 11: {
				return "JACK"
			}
			case 12: {
				return "QUEEN"
			}
			case 13: {
				return "KING"
			}
			case 14: {
				return "ACE"
			}
		}
	} else if (number <= 10) {
		return number
	}
}
const [numbers, colors] = separateNumberandColor(myCards)
//////////////////////////////////////////////////////////
//////////////         MAIN FUNCTION       ///////////////
//////////////////////////////////////////////////////////
function defineYourCardSet(numbers, colors) {
	let color = false
	//if colors are the same that means you have 5 cards the same color
	color = colors.every(color => color === colors[0])
	let sortNumbers = numbers.sort((a, b) => a - b)
	let firstFourCards = sortNumbers.slice(0, 4)
	let firstThreeCards = sortNumbers.slice(0, 3)
	let firstTwoCards = sortNumbers.slice(0, 2)
	let lastFourCards = sortNumbers.slice(1)
	let lastThreeCards = sortNumbers.slice(2)
	let lastTwoCards = sortNumbers.slice(3)
	let arrayWithPairs = []
	if (
		color &&
		sortNumbers[4] === 14 &&
		checkIfNextNumberIsGreaterByOne(sortNumbers)
	) {
		console.log("Royal flush")
	} else if (
		color &&
		checkIfNextNumberIsGreaterByOne(sortNumbers) &&
		sortNumbers[4] !== 14
	) {
		console.log("Straight flush")
	} else if (color && !checkIfNextNumberIsGreaterByOne(sortNumbers)) {
		console.log("Flush *5 cards same color")
	} else if (
		(!color && checkIfNextNumberIsGreaterByOne(sortNumbers)) ||
		(!color &&
			sortNumbers.indexOf(14) === 4 &&
			sortNumbers.indexOf(2) === 0 &&
			sortNumbers.indexOf(3) === 1 &&
			sortNumbers.indexOf(4) === 2 &&
			sortNumbers.indexOf(5) === 3)
	) {
		console.log(
			"Straight *5 cards every greater than prevoius by one, but not the same color, ACE could be highest card or lowest"
		)
	} else if (
		checkIfAllSameNumbers(firstFourCards) ||
		checkIfAllSameNumbers(lastFourCards)
	) {
		console.log("Four of a kind 'Quads' *same value of four cards")
	} else if (
		(checkIfAllSameNumbers(firstThreeCards) &&
			checkIfAllSameNumbers(lastTwoCards)) ||
		(checkIfAllSameNumbers(firstTwoCards) &&
			checkIfAllSameNumbers(lastThreeCards))
	) {
		console.log(
			"Full House *same value of three cards and same value of last two cards"
		)
	} else if (
		checkIfAllSameNumbers(firstThreeCards) ||
		checkIfAllSameNumbers(lastThreeCards)
	) {
		console.log("Three of a kind *same value of three cards")
	} else {
		for (let i = 0; i < sortNumbers.length - 1; i++) {
			if (sortNumbers[i] === sortNumbers[i + 1]) {
				arrayWithPairs.push(sortNumbers[i])
			}
		}
		if (arrayWithPairs.length === 2) {
			console.log("Two Pairs")
		} else if (arrayWithPairs.length === 1) {
			console.log("One Pair")
		} else if (arrayWithPairs.length === 0) {
			console.log("High Card:", cardFigures(sortNumbers[4]))
		}
	}
}
defineYourCardSet(numbers, colors)

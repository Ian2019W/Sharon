const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];
let moves = 0;
let timer;
let startTime;
let flippedCards = [];
let matchedCards = 0;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    moves = 0;
    matchedCards = 0;
    flippedCards = [];
    movesDisplay.textContent = moves;
    timerDisplay.textContent = '0:00';
    clearInterval(timer);
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.length === 2) {
        return;
    }
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cardsArray.length) {
            clearInterval(timer);
            setTimeout(() => alert(`You won in ${moves} moves and ${timerDisplay.textContent}!`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

restartButton.addEventListener('click', startGame);

window.onload = startGame;
const images = [
    "🍓", "🥑", "🍎", "🍌", "🍒", "🍇", "🍍", "🍉",
    "🍓", "🥑", "🍎", "🍌", "🍒", "🍇", "🍍", "🍉",
];

let grid = document.getElementById("gameGrid");
let timerEl = document.getElementById("timer");
let newGameBtn = document.getElementById("newGame");
let gameOverEl = document.getElementById("gameOver");
let timeTakenEl = document.getElementById("timeTaken");

let flippedCards = [];
let matchedPairs = 0;
let timer = null;
let time = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    grid.innerHTML = "";
    const shuffledImages = shuffle(images);

    shuffledImages.forEach((emoji) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='50'%3E${emoji}%3C/text%3E%3C/svg%3E" alt="Fruit">`;
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }

        if (!timer) {
            startTimer();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;

    if (img1 === img2) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === images.length / 2) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        const minutes = String(Math.floor(time / 60)).padStart(1, '0');
        const seconds = String(time % 60).padStart(2, '0');
        timerEl.textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    gameOverEl.classList.remove("hidden");
    timeTakenEl.textContent = `${minutes}:${seconds}`;
}

function resetGame() {
    clearInterval(timer);
    timer = null;
    time = 0;
    matchedPairs = 0;
    flippedCards = [];
    timerEl.textContent = "Time: 00:00";
    gameOverEl.classList.add("hidden");
    createBoard();
}

newGameBtn.addEventListener("click", resetGame);

// Initialize game
createBoard();
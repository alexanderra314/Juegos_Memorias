
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplica las cartas para hacer pares
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');

// Función para mezclar las cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generar el tablero de juego
function createBoard() {
    gameBoard.innerHTML = ''; // Limpiar el tablero
    shuffle(cards).forEach((value, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = '?'; // Mostrar un signo hasta que se dé la vuelta
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Función para voltear la carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verificar si las cartas coinciden
function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '?';
            card2.innerHTML = '?';
            flippedCards = [];
        }, 1000);
    }
}
// funcion temporizador
let startTime;
let timerInterval;
document.getElementById ('startButton').addEventListener ('click', function(){
    startGame();
});
document.getElementById ('endButton').addEventListener ('click', function() {
    ednGame();
});
function startGame(){
    startTime = Date.now(); //Captura el tiempo actual
    if (stopExecution) return; // Verifica si debe detenerse
    timerInterval = setInterval(updateTimer, 1000); //Actualiza el cronometro cada segundo
    document.getElementById('startButton').style.display = 'none';
    document.getElementById ('endButton').style.display = 'inline';
}
function updateTimer(){
    const elapsedTime = Math.floor ((Date.now() - startTime) / 1000); //Calcula el tiempo transcurrido en segundos
    document.getElementById('timer').innerText = `tiempo: ${elapsedTime} segundos`;
}
function ednGame(){
    clearInterval(timerInterval); //Detiene el cronometro
    alert(`juego finalizado. Tiempo total: ${document.getElementById('timer').innerText}`);
    document.getElementById('endButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'inline';
}
// Pausar el juego

let stopExecution = false;
document.getElementById('pause-btn').addEventListener('click', () => {
function pausetemp() {
    stopExecution = true; 
}


});
// Reiniciar el juego
document.getElementById('reset-btn').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    createBoard();
});

// Inicializar el juego
createBoard();
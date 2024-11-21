const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const cardsContainer = document.getElementById("cards");
const logContainer = document.getElementById("log");
const drawButton = document.getElementById("drawCards");
const sortButton = document.getElementById("sortCards");
const cardCountInput = document.getElementById("cardCount");

let cards = [];
let changesLog = [];

// Genera una carta aleatoria
function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    const numericValue = values.indexOf(value) + 1; // Para ordenar
    return { suit, value, numericValue };
}

// Genera un conjunto de cartas aleatorias
function generateRandomCards(count) {
    cards = Array.from({ length: count }, generateRandomCard);
    renderCards(cards);
}

// Renderiza las cartas
function renderCards(cards) {
    cardsContainer.innerHTML = "";
    cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.textContent = `${card.value}${card.suit}`;
        cardsContainer.appendChild(cardDiv);
    });
}

// Algoritmo de selección
function selectionSort(cards) {
    const arr = [...cards];
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j].numericValue < arr[minIndex].numericValue) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            logChange(arr);
        }
    }
    return arr;
}

// Registra cambios
function logChange(cards) {
    changesLog.push(cards.map(card => `${card.value}${card.suit}`));
    renderLog();
}

// Renderiza el registro de cambios
function renderLog() {
    logContainer.innerHTML = "<h2>Registro de Cambios:</h2>";
    changesLog.forEach((logEntry, index) => {
        const logDiv = document.createElement("div");
        logDiv.className = "log-entry";
        logDiv.textContent = `Paso ${index + 1}: ${logEntry.join(", ")}`;
        logContainer.appendChild(logDiv);
    });
}

// Event Listeners
drawButton.addEventListener("click", () => {
    const count = Math.min(Math.max(parseInt(cardCountInput.value) || 5, 1), 52);
    generateRandomCards(count);
    changesLog = [];
    renderLog();
});

sortButton.addEventListener("click", () => {
    cards = selectionSort(cards);
    renderCards(cards);
});

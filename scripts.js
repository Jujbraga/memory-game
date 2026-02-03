// Path to the cards images
const imgPath = "assets/flags/";

// Array with the cards game
const flags = [
  { id: 1, url: imgPath + "france.png", matched: false },
  { id: 2, url: imgPath + "germany.png", matched: false },
  { id: 3, url: imgPath + "italy.png", matched: false },
  { id: 4, url: imgPath + "portugal.png", matched: false },
  { id: 5, url: imgPath + "spain.png", matched: false },
  { id: 6, url: imgPath + "united-kingdom.png", matched: false },
  { id: 7, url: imgPath + "greece.png", matched: false },
  { id: 8, url: imgPath + "moldova.png", matched: false },
  { id: 9, url: imgPath + "norway.png", matched: false },
  { id: 10, url: imgPath + "sweden.png", matched: false },
  { id: 11, url: imgPath + "albania.png", matched: false },
  { id: 12, url: imgPath + "scotland.png", matched: false },
  { id: 13, url: imgPath + "slovakia.png", matched: false },
  { id: 14, url: imgPath + "vatican.png", matched: false },
  { id: 15, url: imgPath + "croatia.png", matched: false },
];

let cardItems = [];

// Game varibles
let flippedCards = []; // Store the flipped cards
let isCheckingCards = false; // Block the game while cheching pairs
let matchedPairs = 0; // Counter of pairs found
let attempts = 0; // Counter of attempts

// Set the level to change the cards quantity
function setLevel() {
  const levelOptions = document.querySelector(".level-options");
  const cssRoot = document.querySelector(":root");
  const mediaQuery = window.matchMedia("(max-width: 38em)");

  levelOptions.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "hard":
        cardItems = [...flags, ...flags];
        cssRoot.style.setProperty("--grid-column", "repeat(6, 1fr)");
        break;
      case "medium":
        cardItems = [...flags.slice(0, 10), ...flags.slice(0, 10)];
        cssRoot.style.setProperty("--grid-column", "repeat(5, 1fr)");
        break;
      default:
        cardItems = [...flags.slice(0, 6), ...flags.slice(0, 6)];
        break;
    }
    // Set cards grid in mobile
    if (mediaQuery && cardItems.length > 12) {
      cssRoot.style.setProperty("--grid-column", "repeat(5, 1fr)");
    }

    renderCards(cardItems);
  });
}

function shuffleCards(array) {
  // Shuffle items in the array
  const shuffled = array.sort(() => Math.random() - 0.5);

  return shuffled;
}

function createCard(card) {
  // Create a card element
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  // Create the card image
  const imgElement = document.createElement("img");
  imgElement.className = "card-flag";
  imgElement.setAttribute("src", card.url);

  // Add image element to card
  cardElement.appendChild(imgElement);

  // Add click event to show the image
  cardElement.addEventListener("click", () => {
    showCard(cardElement, card);
  });

  return cardElement;
}

// Renders the cards
function renderCards(cards) {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  // Create the board
  const board = document.createElement("div");
  board.setAttribute("id", "board");
  board.classList.add("cards-grid");
  gameBoard.appendChild(board);

  const shuffledCards = shuffleCards(cards);
  shuffledCards.forEach((card) => {
    const cardElement = createCard(card);
    board.appendChild(cardElement);
  });
}

function showCard(cardElement, card) {
  if (isCheckingCards || cardElement.classList.contains("revealed")) {
    return;
  }

  // Add class to element
  cardElement.classList.add("revealed");

  flippedCards.push({ card, cardElement });

  if (flippedCards.length === 2) {
    // Block the click
    isCheckingCards = true;
    const [cardOne, cardTwo] = flippedCards;

    // Check if both cards are equal
    if (cardOne.card.id === cardTwo.card.id) {
      card.matched = true; // Set this propertie to true
      flippedCards = []; // Clear this array to next round
      matchedPairs++; // Increments the number of pairs found
      isCheckingCards = false; // Unlock the game for the next round
    } else {
      // If not equal
      setTimeout(() => {
        cardOne.cardElement.classList.remove("revealed");
        cardTwo.cardElement.classList.remove("revealed");
        flippedCards = [];
        isCheckingCards = false;
      }, 1000);
    }

    // Increments the attempts
    attempts++;
    updateStats();

    // Check if there is pairs to find
    const toFind = cardItems.find((item) => item.matched === false);

    if (!toFind) {
      alert(
        "🎉 Congrats! You found all pairs.\nTo play again click in the Restart button.",
      );
    }
  }
}

function updateStats() {
  const stats = document.querySelector(".stats");
  stats.textContent = `${matchedPairs} pairs found out of ${attempts} attempts`;
}

function restartGame() {
  // Reset the game variables
  flippedCards = [];
  isCheckingCards = false;
  matchedPairs = 0;
  attempts = 0;

  // Reset the cards matched property
  cardItems.forEach((card) => (card.matched = false));

  renderCards(cardItems);
  updateStats();
}

function restartGameButton() {
  const restartButton = document.querySelector("#restart");
  restartButton.addEventListener("click", restartGame);
}

setLevel();

// restartGameButton();

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
];

const cardItems = [...flags, ...flags];

// Game varibles
let flippedCards = []; // Store the flipped cards
let isCheckingCards = false; // Block the game while cheching pairs
let matchedPairs = 0; // Contador de pares encontrados.
let attempts = 0; // Contador de tentativas do jogador.

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
  const board = document.getElementById("board");
  board.innerHTML = "";

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
      isCheckingCards = false; // Unlock the game for the next round
      console.log("Match");
      console.log(matchedPairs);
    } else {
      // If not equal
      setTimeout(() => {
        cardOne.cardElement.classList.remove("revealed");
        cardTwo.cardElement.classList.remove("revealed");
        flippedCards = [];
        isCheckingCards = false;
      }, 1000);
    }
    // console.log(flippedCards);
  }
}

renderCards(cardItems);

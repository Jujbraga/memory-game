// Path to the cards images
const imgPath = "assets/flags/";

// Array with the cards game
const flags = [
  { id: 1, url: imgPath + "france.png" },
  { id: 2, url: imgPath + "germany.png" },
  { id: 3, url: imgPath + "italy.png" },
  { id: 4, url: imgPath + "portugal.png" },
  { id: 5, url: imgPath + "spain.png" },
  { id: 6, url: imgPath + "united-kingdom.png" },
];

let cardItems = [...flags, ...flags];

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
    cardElement.classList.add("revealed");
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

renderCards(cardItems);

console.log(cardItems);

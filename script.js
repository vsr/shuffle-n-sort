/**
 * Returns html for card
 * @param {string} content text content for card
 * @param {string} bgColor background color for card
 * @returns {string} html card content
 */
const cardTemplate = (content, bgColor = "transparent") => {
  return `<div class="card" data-id="${content}">
            <div class="card__bg" style="background-color: ${bgColor}"></div>
            <div class="card__content">${content}</div>
        </div>`;
};

/**
 * Adds cards to container
 * @param {HTMLDivElement} container dom node for cards
 * @param {Number} cardCount number of cards
 * @param {string[]} colors list of card bg colors
 */
const createCards = (container, cardCount, colors) => {
  let html = "";
  for (let i = 1; i <= cardCount; i++) {
    html += cardTemplate(i, colors[i - 1]);
  }
  container.innerHTML = html;
};

/**
 * Shuffles cards
 * @param {HTMLDivElement} cardList card container
 */
const shuffleCards = (cardList) => {
  // document fragment to hold shuffled cards
  const fragment = document.createDocumentFragment();
  const cards = cardList.children;
  // loop till we have moved all cards
  while (cards.length > 0) {
    // pick a random card and add to fragment
    fragment.appendChild(cards.item(Math.floor(cards.length * Math.random())));
  }
  // add the shuffled cards to container
  cardList.appendChild(fragment);
};

/**
 * Sorts cards
 * @param {HTMLDivElement} cardList card container
 */
const sortCards = (cardList) => {
  // document fragment to hold sorted cards
  const fragment = document.createDocumentFragment();
  // sort cards by data-id attribute
  Array.from(cardList.children)
    .sort(
      (a, b) =>
        parseInt(a.getAttribute("data-id"), 10) -
        parseInt(b.getAttribute("data-id"), 10)
    )
    // add sorted cards to fragment
    .forEach((el) => fragment.appendChild(el));
  // add sorted cards back to container
  cardList.appendChild(fragment);
};

const cardColors = [
  "#6F98A8",
  "#2B8EAD",
  "#2F454E",
  "#2B8EAD",
  "#2F454E",
  "#BFBFBF",
  "#BFBFBF",
  "#6F98A8",
  "#2F454E",
];

/**
 * Intialize the app
 */
function init() {
  const cardList = document.querySelector(".card-list");
  createCards(cardList, 9, cardColors);
  document
    .querySelector(".card-button.shuffle")
    .addEventListener("click", () => shuffleCards(cardList));
  document
    .querySelector(".card-button.sort")
    .addEventListener("click", () => sortCards(cardList));
}

window.addEventListener("DOMContentLoaded", init);

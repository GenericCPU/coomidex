// Global variable for champion data
let champions = [];

// Load champion.json then generate the grid
fetch('champion.json')
  .then(response => response.json())
  .then(data => {
    champions = data;
    generateGrid(champions);
  })
  .catch(error => console.error('Error loading champion data:', error));

// Generate grid items from champion data
function generateGrid(championArray) {
  const gridContainer = document.getElementById('gridContainer');
  championArray.forEach(champion => {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    div.dataset.championNumber = champion.championNumber;
    div.dataset.cardImg = 'card pics/' + champion.championNumber + '.png';
    
    const img = document.createElement('img');
    img.src = 'small pics/' + champion.championNumber + '.png';
    img.alt = champion.name;
    div.appendChild(img);
    gridContainer.appendChild(div);
    
    // On click, snap the next default coin to the center of this grid item
    div.addEventListener('click', () => {
      const coinToUse = getNextCoin();
      placeCoinOnSquare(coinToUse, div);
    });
  });
}

/*******************************************************
 * ALTERNATE DEFAULT COIN FOR CLICK
 *******************************************************/
let lastCoinUsed = 'blue'; // So the first click uses orange
function getNextCoin() {
  if (lastCoinUsed === 'blue') {
    lastCoinUsed = 'orange';
    activeCoin = selectorOrange;
  } else {
    lastCoinUsed = 'blue';
    activeCoin = selectorBlue;
  }
  return activeCoin;
}

/*******************************************************
 * DRAGGABLE COINS & HOVER UPDATES
 *******************************************************/
let activeCoin = null;
let draggingCoin = null;
let offsetX = 0, offsetY = 0;
let currentHighlightedItem = null;
let selectedItemOrange = null;
let selectedItemBlue = null;

const mainContent = document.getElementById('mainContent');
const selectorOrange = doc


const intro = document.querySelector(".intro");
const gamemode = document.querySelector(".game-mode");
let playbtn = document.querySelector(".play-btn");
let lockBoard = false; // Add this line

document.addEventListener("DOMContentLoaded", function () {
  intro.style.display = "block";
  gamemode.style.display = "none";
});

playbtn.addEventListener("click", function (e) {
  gamemode.style.display = "flex";
  intro.style.display = "none";
});

let cards = document.querySelectorAll(".card-flip");

function flipCard() {
  if (lockBoard) return; // Don't flip if more than 2 cards are already flipped
  this.classList.add('flipped');
  
  if (!hasFlippedCard) {
    // on the first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // on the second click
    hasFlippedCard = false;
    secondCard = this;

    if (firstCard.dataset.card === secondCard.dataset.card) {
      let score  = document.querySelectorAll('.score');
      // it's a match
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      for(let i= 0; i < score.length; i++){
        if(firstCard.dataset.card === secondCard.dataset.card){
          score.innerHTML = parseInt(score.innerHTML) + 10;
        }
      }
    } else {
      lockBoard = true; // Lock the board
      // not a match
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        lockBoard = false; // Unlock the board
      }, 1000);
    }
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", flipCard);
}

document.querySelector(".restartbtn").addEventListener("click", function () {
  // Clear the flipped cards
  for (let card of cards) {
    card.classList.remove('flipped');
    card.addEventListener('click', flipCard);
  }

  // Shuffle the cards
  const cardsContainer = document.querySelector(".cards");
  for (let i = cardsContainer.children.length; i >= 0; i--) {
    cardsContainer.appendChild(
      cardsContainer.children[(Math.random() * i) | 0]
    );
  }
});

let hasFlippedCard = false;
let firstCard, secondCard;
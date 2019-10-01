/* The purpose of this web-based app is to allow the user
 * to be able to play a game of memory of which two
 * cards are chosen by the user and then flipped to see if they match;
 * with the least amount of flips or guesses in total. */
/* upon first card_click initiation, begin timer counter as global variable */

let stopWatch;
const entireDeck = document.querySelector('.deck');
entireDeck.addEventListener('click', function () {
    if (!stopWatch) {
        stopWatch = setInterval(countTimer, 1000);
    };
});

const time_counter = []
var totalSeconds = 0;
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);

    document.getElementById('timer').innerHTML = minute + ' min : ' + seconds + ' sec';
};

/* initiate number of card clicks that player chooses, as a clicks counter as a global variable */
/* increment the move counter and display it on the page (put this functionality in another function that you call from this one) */
let stars = 3;
function increase() {
    document.getElementById('moves').textContent++;
};

/* star-score performance matrix (change style attribute of the stars from yellow to grey as performance deteriorates): */

function decrease() {
    if (document.getElementById('moves').textContent > 26) {
        const list = document.getElementsByClassName("stars")[0];
        list.getElementsByClassName("fa fa-star")[2].style.color = "grey"
        stars= 2;
    };
    if (document.getElementById('moves').textContent > 36) {
        const list = document.getElementsByClassName("stars")[0];
        list.getElementsByClassName("fa fa-star")[1].style.color = "grey"
        stars = 1;
    };
};


 /* Create a {live, manipulatable} list {or array} that contains all {16 in total} of the cards-- */
 const cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube",
 "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
 "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

 function shuffleCards(){
    let result = shuffle(cards);
    /* Shuffle all cards and reiterate them back into the original html. Loop through each card and create its own HTML; add  each card's HTML to the page; */
    for (let i = 0; i < result.length; i++) {
        let cardElement = document.createElement("li");
        cardElement.className = "card";
        let iconElement = document.createElement("i");
        iconElement.className = result[i];
        cardElement.appendChild(iconElement);
        entireDeck.appendChild(cardElement);
    }
}

/* Shuffle the list of cards using Udacity-provided "shuffle" method:
 Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
shuffleCards();

/* Set up the event listener for a card. If a card is clicked: display the card's symbol (put this functionality in another function that you call from this one)*/

const displayShuffledCards = document.querySelectorAll('.card');

let openCards = []; 
let openCardsTwo = [];

displayShuffledCards.forEach(function (card) {
    card.addEventListener('click', function (flip) {
        card.classList.add('open', 'show', 'disabled');
        increase();
        decrease();
        twoCards(flip);
        twoCardsTwo(flip);
        twoCardsClicked();
        winner();
    });
});

/*  Add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */

function twoCards(card) {
    openCards.unshift(card.target.lastElementChild.className);
};

console.log(openCards);

function twoCardsTwo(flip) {
    openCardsTwo.unshift(flip.target);
}

console.log(openCardsTwo);

/*  - if the list already has another card, check to see if the two cards match

if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) */

function twoCardsClicked(card) {
    if (openCards.length === 2) {
        compareCards();
    };
};


function compareCards(flip) {

    if (openCards[0] === openCards[1]) {
        openCardsTwo[0].classList.add('match');
        openCardsTwo[1].classList.add('match');
        document.getElementById('match').textContent++;
        openCards = [];
        openCardsTwo = [];
    } else {
        setTimeout(function () {
            openCardsTwo.forEach(card => card.classList.remove('open', 'show', 'disabled'));
            openCards = [];
            openCardsTwo = [];
        }, 750);
    }
};

/*    --if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) */
/* if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) */
/* Closing 'You're a Winner ~ Game Over' Alert Box. */

function winner() {
    if (document.getElementById('match').textContent == 8) {
        swal({
            title: 'Congratulations! You won the memory matching game!', 
            text: `Stats: ${moves.innerHTML} Clicks; Time: ${document.getElementById('timer').innerHTML},
            with a performance factor of ${stars} Star(s)! 
            Hit 'OK' to replay game. Hit 'Cancel' to Exit.`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'OK',
            buttons: ['Cancel', true],
        }).then(() => {
            gameRestart();
        });
    };
};

function gameRestart() {
    document.getElementById('moves').textContent = '0';
    document.getElementById('match').textContent = '0';
    const stars = document.getElementsByClassName("stars")[0];
    stars.getElementsByClassName("fa fa-star")[2].style.color = "black";
    stars.getElementsByClassName("fa fa-star")[1].style.color = "black";
    stars.getElementsByClassName("fa fa-star")[0].style.color = "black";
    document.getElementById('timer').textContent = `0 min : 0 sec`;
    totalSeconds = 0;
    clearInterval(stopWatch);
    stopWatch = null;
    openCards = [];
    displayShuffledCards.forEach(card => card.classList.remove('open', 'show', 'match'));
};
const restartButton = document.querySelector('span#restart');
restartButton.addEventListener('click', function (event) {
    gameRestart();
});

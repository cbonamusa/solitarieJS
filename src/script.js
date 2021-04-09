import Deck from './deck.js';
import Pile from './deck.js';

const mainPile = document.querySelector('.hide-pile');
const showPile = document.querySelector('.show-pile');

const fundationPile01 = document.querySelector('.foundation-01');
const fundationPile02 = document.querySelector('.foundation-02');
const fundationPile03 = document.querySelector('.foundation-03');
const fundationPile04 = document.querySelector('.foundation-04');

const gamePile01 = document.querySelector('.pile-01');
const gamePile02 = document.querySelector('.pile-02');
const gamePile03 = document.querySelector('.pile-03');
const gamePile04 = document.querySelector('.pile-04');
const gamePile05 = document.querySelector('.pile-05');
const gamePile06 = document.querySelector('.pile-06');
const gamePile07 = document.querySelector('.pile-07');


document.addEventListener('click', () => {
})

start();
function start() {
    const deck = new Deck();
    deck.shuffle();

    let pile = new Array();
    for(let i = 1; i <= 7; i++) { pile.push(new Pile(deck.cards.splice(0,i))); }
    let mainPile = new Pile(deck.cards);

    //split in two equal piles of cards - ceil due to there is odd number of cards
        // const deckPoint = Math.ceil(deck.numberOfCards / 2);
        // hideDeck = new Deck(deck.cards.slice(0, deckPoint));
        // showCard = new Deck(deck.cards.slice(deckPoint, deck.numberOfCards));  
    // mainPile.appendChild(deck.cards.getHTML())
}

import Deck from './deck.js';
import { Pile } from './deck.js';

const mainPileDOM = document.querySelector('.main-pile');
const showPileDOM = document.querySelector('.show-pile ul');


//Create the full Deck of cards
const deck = new Deck();
deck.shuffle();

//Generate all the piles with our deck of cards
let pile = new Array();
for ( let i = 1; i <= 7; i++ ) { pile.push(new Pile(deck.cards.splice(0,i), i, `pile-${i}`)); }
let mainPile = new Pile(deck.cards, 'main');
let showPile = new Pile(new Array(), 'show');

let spadePile = new Pile(new Array(), 'spade', '♠');
let heartPile = new Pile(new Array(), 'heart', '♥');
let diamondPile = new Pile(new Array(), 'diamond', '♦');
let clubsPile = new Pile(new Array(), 'clubs', '♣');

//Print in console to test
console.log('new DECK', new Deck());
console.log('new PILE Empty', new Pile(new Array(), 'clubs', '♣'));
console.log('pile with 7', pile[6]); // 0 - 6
console.log('mainPile popCard', mainPile.popCard())


//MAIN & SHOW Pile spot in DOM
mainPileDOM.appendChild(mainPile.createHTML());

//Get the cards from main pile to show pile
document.querySelector('.pile-main').addEventListener('click', () => {
    if (mainPile.numberOfCards != 0) {
        document.querySelector('.pile-main').classList.add('pile');
        showPile.pushCard(mainPile.popCard());
        showPileDOM.prepend(showPile.cards[0].getHTML());
    } else {
        mainPile.pushAll(showPile.popAll());
        showPileDOM.innerHTML = '';
    }   
})

//GAME Pile 1 in DOM - not the good way... -
document.querySelector('[data-pile="1"] ul').appendChild(pile[0].cards[0].getHTML());

/* Drag and drop cards */
const emptyPiles = document.querySelectorAll('.pile');
const pickedCard = document.querySelector('.card'); //not working on dynamic cards ????

pickedCard.addEventListener('dragstart', dragStart);
pickedCard.addEventListener('dragend', dragEnd);

function dragStart() {
    /* Once the user clicks the card and moves it pops up from the pile */
    console.log('start');
    this.classList.add("invisible");
    /*Como sacar la carta seleccionada de la pila donde estaba?:
     - Identificar la carta seleccionada
     - Identificar la pila donde se encontraba la carta
    */
}
function dragEnd() {
    /* Once the user releases the card it goes to another pile (or the same it begans) */
    console.log('end');
    this.classList.remove("invisible");
}
/* TODO LIST:
 00.  */
 test();
 function test() {
    console.log(pile[3]) //4 cartas
    console.log(pile[3].popCard()) //1 carta del pile-3

 }
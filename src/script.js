import Deck from './deck.js';
import { Pile } from './deck.js';


const mainPileDOM = document.querySelector('.main-pile');
const showPileDOM = document.querySelector('.show-pile ul');


document.addEventListener('click', () => {
})

start();
function start() {
    //Create the full Deck of cards
    const deck = new Deck();
    deck.shuffle();

    //Generate all the piles with our deck of cards
    let pile = new Array();
    for ( let i = 1; i <= 7; i++ ) { 
        pile.push(new Pile(deck.cards.splice(0,i), i, `pile-${i}`)); 
    }
    let mainPile = new Pile(deck.cards, 'main');
    let showPile = new Pile(new Array(), 'show');

    let spadePile = new Pile(new Array(), 'spade', '♠');
    let heartPile = new Pile(new Array(), 'heart', '♥');
    let diamondPile = new Pile(new Array(), 'diamond', '♦');
    let clubsPile = new Pile(new Array(), 'clubs', '♣');

    //MAIN & SHOW Pile spot in DOM
        mainPileDOM.appendChild(mainPile.createHTML());
        //Logic to get the cards from main pile to show pile
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

    //GAME Piles cards in DOM
        document.querySelector('[data-pile="1"] ul').appendChild(pile[0].cards[0].getHTML());
            
    console.log('new DECK', new Deck());
    console.log('pile', pile[6]); // 0 - 6
    console.log('mainPile', mainPile.popCard())
}

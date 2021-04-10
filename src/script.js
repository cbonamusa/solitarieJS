import Deck from './deck.js';
import { Pile } from './deck.js';


const mainPileDOM = document.querySelector('.main-pile');
// const showPile = document.querySelector('.show-pile');

// const fundationPile01 = document.querySelector('.foundation-01');
// const fundationPile02 = document.querySelector('.foundation-02');
// const fundationPile03 = document.querySelector('.foundation-03');
// const fundationPile04 = document.querySelector('.foundation-04');

// const gamePile01 = document.querySelector('.pile-01');
// const gamePile02 = document.querySelector('.pile-02');
// const gamePile03 = document.querySelector('.pile-03');
// const gamePile04 = document.querySelector('.pile-04');
// const gamePile05 = document.querySelector('.pile-05');
// const gamePile06 = document.querySelector('.pile-06');
// const gamePile07 = document.querySelector('.pile-07');


document.addEventListener('click', () => {
})

start();
function start() {
    const deck = new Deck();
    deck.shuffle();

    //Generate all the pile of cards we need
    let pile = new Array();
    for ( let i = 1; i <= 7; i++ ) { 
        pile.push(new Pile(deck.cards.splice(0,i))); 
    }
    let mainPile = new Pile(deck.cards);
    
    //First Pile spot in DOM
        mainPileDOM.appendChild(mainPile.createHTML());
        document.addEventListener('click', () => {
            mainPileDOM.appendChild(mainPile.popCard().getHTML());
            console.log('test', mainPile);
        })

    //GamePile cards

    console.log('new PILE', new Pile(deck.cards, ));
    console.log('new DECK', new Deck());
    console.log('pile', pile[6]); // 0 - 6
    console.log('mainPile', mainPile.popCard())
    // mainPile.appendChild(deck.cards.getHTML())
}

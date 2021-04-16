import Deck from './deck.js';
import { Pile } from './deck.js';

let querySel = (el) => document.querySelector(el);
const mainPileDOM = document.querySelector('.main-pile');
const showPileDOM = document.querySelector('.show-pile ul');



/*-------------------- CREATE FULL DECK OF CARDS & SHUFLE ---------------------*/
const deck = new Deck();
deck.shuffle();



/*---------------------- GENERATE ALL PILES WITH CARDS ------------------------*/
let piles = new Array();
for ( let i = 1; i <= 7; i++ ) { piles.push(new Pile(deck.cards.splice(0,i), `pile-${i}`, "descendence")); }
let mainPile = new Pile(deck.cards, 'main', 'dontAccept'); //let mainPile = deck ? TO DO
let showPile = new Pile(new Array(), 'show', 'acceptAll');

let spadePile = new Pile(new Array(), 'spade', '♠');
let heartPile = new Pile(new Array(), 'heart', '♥');
let diamondPile = new Pile(new Array(), 'diamond', '♦');
let clubsPile = new Pile(new Array(), 'clubs', '♣');



/*---------- PASS CARDS FROM MAIN TO SHOW PILE (AND RENDER BOTH) -------------*/
mainPileDOM.appendChild(mainPile.createHTML());
document.querySelector('.pile-main').addEventListener('click', () => {
    if (mainPile.numberOfCards != 0) {
        document.querySelector('.pile-main').classList.add('pile');
        showPile.pushCard(mainPile.popCard());
        showPileDOM.prepend(showPile.cards[0].generateDOMElement('show'));
    } else {
        mainPile.pushAll(showPile.popAll());
        showPileDOM.innerHTML = '';
    }   
})



/*--------------- RENDER CARDS OF GAME PILES & CALL EVENT CLICK F -----------------*/
function renderPile(pile, index, dataPileDOM ) {
    for( let x = 0; x < pile.cards.length -1 ; x++ ) {
        dataPileDOM.appendChild(pile.cards[x].generateDOMElement());
    }
    dataPileDOM.appendChild(pile.cards[pile.cards.length-1].generateDOMElement('show'));

    let pileDOM = dataPileDOM.querySelectorAll('li');
    let lastCardinPileDOM = pileDOM[pileDOM.length -1];

    clickedCardInPile(lastCardinPileDOM, pile);
 }

 function render() {
     for (let i = 0; i < piles.length; i++) {
         renderPile(piles[i], i, querySel(`[data-pile="${i+1}"] ul`))
     }
 }
 render();



/*----------------- CLICK CARDS / DRAG CARDS  -------------------*/ 
 function clickedCardInPile(lastCardDOM, pileMOD) {
    // lastCardDOM.addEventListener('click', () => {console.log(pileMOD)});
    lastCardDOM.addEventListener('dragstart', dragStart(lastCardDOM, pileMOD));

    // render();
 }

 let selectedPile = -1;



function dragStart(card, pile) {
    /* Once the user clicks the card and moves it pops up from the pile */
    console.log('start');
    card.addEventListener('mousedown', () => {
        setTimeout(()=> {  card.classList.add("invisible") }, 50)
    })
}
function dragEnd(card, pile) {
    /* Once the user releases the card it goes to another pile (or the same it begans) */
    console.log('end');
    card.addEventListener('mouseup', () => {
        this.classList.remove("invisible");
    })

    for (pile of piles ) {
        pile.addEventListener('dragover', dragOver);
        pile.addEventListener('dragenter', dragEnter);
        pile.addEventListener('dragleave', dragLeave);
        pile.addEventListener('drop', dragDrop);
    }
}
function dragOver(e) {
    e.preventDefault();
    console.log('over')
}
function dragEnter(e) {
    e.preventDefault();
    //Añadir clase hoverLike para que se muestre como hover
    console.log('enter')
}
function dragLeave() {console.log('leave')}
function dragDrop() {console.log('drop')}





 printInConsoleforTESTING();
 function printInConsoleforTESTING() {
    //Print in console to test
    console.log('new DECK', new Deck());
    console.log('PILE MAIN', mainPile);
    console.log('PILE SHOW', showPile);

    console.log('PILE spade', spadePile)  
    console.log('PILE heart', heartPile ) 
    console.log('PILE diamond', diamondPile) 
    console.log('PILE club', clubsPile) 

    console.log('PILE-1', piles[0]);
    console.log('PILE-2', piles[1]);
    console.log('PILE-3', piles[2]);
    console.log('PILE-4', piles[3]);
    console.log('PILE-5', piles[4]);
    console.log('PILE-6', piles[5]);
    console.log('PILE-7', piles[6]); 
    console.log('all piles', piles);
    console.log('LAST CARD OF PILE 7', piles[6].cards.length)
    console.log('mainPile popCard', mainPile.popCard())
    console.log(piles[3]) //4 cartas
    console.log(piles[3].popCard()) //1 carta del pile-3

 }
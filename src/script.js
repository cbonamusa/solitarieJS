import Deck from './deck.js';
import { Pile } from './deck.js';

let querySel = (el) => document.querySelector(el);




/*--------------------- CREATE FULL DECK OF CARDS & SHUFLE --------------------*/
const deck = new Deck();
deck.shuffle();



/*---------------------- GENERATE ALL PILES WITH CARDS ------------------------*/
let piles = new Array();
for ( let i = 1; i <= 7; i++ ) { piles.push(new Pile(deck.cards.splice(0,i), `pile-${i}`, "descendence")); }
let mainPile = new Pile(deck.cards, 'main', 'dontAccept'); //mainPile = deck - pending TO DO
let showPile = new Pile(new Array(), 'show', 'acceptAll');

let spadePile = new Pile(new Array(), 'spade', '♠');
let heartPile = new Pile(new Array(), 'heart', '♥');
let diamondPile = new Pile(new Array(), 'diamond', '♦');
let clubsPile = new Pile(new Array(), 'clubs', '♣');

const mainPileDOM = document.querySelector('.main-pile');
const showPileDOM = document.querySelector('.show-pile ul');




/*------------ PASS CARDS FROM MAIN TO SHOW PILE (AND RENDER BOTH) -------------*/
mainPileDOM.appendChild(mainPile.createHTML());
// mainPileDOM.appendChild(mainPile.cards.generateDOMElement());

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



/*--------------- RENDER CARDS OF GAME PILES & CALL EVENT CLICK F ----------------*/
function renderPile(pile, index, dataPileDOM ) {
    for( let x = 0; x < pile.cards.length -1 ; x++ ) {
        dataPileDOM.appendChild(pile.cards[x].generateDOMElement());
    }
    dataPileDOM.appendChild(pile.cards[pile.cards.length-1].generateDOMElement('show'));

    // let pileDOM = dataPileDOM.querySelectorAll('li');
    // let lastCardinPileDOM = pileDOM[pileDOM.length -1];
    // clickedCardInPile(lastCardinPileDOM, pile);
 }

 function render() {
     for (let i = 0; i < piles.length; i++) {
         renderPile(piles[i], i, querySel(`[data-pile="${i+1}"] ul`))
     }
    // document.querySelector('.pile-main').addEventListener('click', () => {  
    //     renderPile(showPile, 0, showPileDOM);
    // })
 }
 render();




/*----------------- GLOBAL VARS PILES, CARDS ETC.IN MOD & DOM ------------------*/
let allPilesMOD = [showPile, spadePile, heartPile, diamondPile, clubsPile]
for (let i = 0; i < piles.length; i++) { allPilesMOD.push(piles[i])};
let lastCardInPileMOD;
for (let pileMOD of allPilesMOD ) { 
    if (pileMOD.cards.length > 0) lastCardInPileMOD = pileMOD.cards[pileMOD.cards.length -1];
}

let allPilesDOM= document.querySelectorAll('.pile-list');
console.log('allPilesDOM',allPilesDOM)

let lastCardinPileDOM = [];
for (let pileDOM of allPilesDOM ) {
    if (pileDOM.hasChildNodes()) {  
         lastCardinPileDOM.push(pileDOM.lastElementChild);  
    }
}
console.log(lastCardinPileDOM)  //array canot addevent listener FIX




/*----------------- CLICK CARDS / DRAG CARDS  -------------------*/ 
clickedCardInPile(lastCardinPileDOM, allPilesDOM, allPilesMOD);

function clickedCardInPile(lastCardinPileDOM, allPilesDOM, allPilesMOD ) {

    for(let lastCard of lastCardinPileDOM )  {
        if(lastCard != null ) {
            lastCard.addEventListener('mousedown', dragStart(lastCard, allPilesMOD));
            lastCard.addEventListener('mouseup', dragEnd(lastCard, allPilesMOD));
        }

    }

    allPilesDOM.forEach(pile => {
        console.log(pile)
        pile.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragEl = document.querySelector('.dragging');
            pile.appendChild(dragEl); 
        })
    });
    // render();
 }

let selectedPile = -1;


function dragStart(lastCardinPileDOM, pile) {
    /* Once the user clicks the card and moves it pops up from the origin pile */
    let movedCard;
    console.log('dragstart lastCardInPileMOD', lastCardInPileMOD)
    lastCardinPileDOM.addEventListener('dragstart', () => {
        setTimeout(()=> {  
            lastCardinPileDOM.classList.add("invisible", "dragging");
            movedCard = (pile.popCard());
        }, 50);
    });
}

function dragOver(e) {
    /* Once the user releases the card it goes to another pile (or the same it begans) */
    e.preventDefault();
}

function dragEnd(card) {
    card.addEventListener('dragend', () => {
        setTimeout(()=> { 
            card.classList.remove("invisible", "dragging"); 
        },1)
    })
}







//  printInConsoleforTESTING();
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
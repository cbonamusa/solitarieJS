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
    //     clickedCardInPile(lastCardinPileDOM, allPilesDOM, allPilesMOD);
    // })
}
render();




/*----------------- GLOBAL VARS PILES, CARDS ETC.IN MOD & DOM ------------------*/
let allPilesMOD = [showPile, spadePile, heartPile, diamondPile, clubsPile]
for (let i = 0; i < piles.length; i++) { allPilesMOD.push(piles[i])};

let lastCardInPileMOD;
let pairsMOD = [];
for (let pileMOD of allPilesMOD ) { 
    if (pileMOD.cards.length > 0) { lastCardInPileMOD = pileMOD.cards[pileMOD.cards.length -1]; }
    pairsMOD.push( {lastCardinPileMOD: pileMOD.cards[pileMOD.cards.length -1], pileMOD});
}


let allPilesDOM= document.querySelectorAll('.pile-list');

let lastCardinPileDOM = [];
let pairsDOM = [];
for (let pileDOM of allPilesDOM ) {
    if (pileDOM.hasChildNodes()) { lastCardinPileDOM.push(pileDOM.lastElementChild); }
    pairsDOM.push({lastCardinPileDOM: pileDOM.lastElementChild, pileDOM}) 
}


let pairsArray = pairsDOM.map(function(item, index) {
   return {
        lastCardinPileDOM: item.lastCardinPileDOM, 
        pileDOM: item.pileDOM,
        lastCardInPileMOD: pairsMOD[index].lastCardinPileMOD,
        pileMOD: pairsMOD[index].pileMOD
    }
})




/*----------------- CLICK CARDS / DRAG CARDS  -------------------*/ 
clickedCardInPile(lastCardinPileDOM, allPilesDOM, pairsMOD, pairsDOM, pairsArray);

function clickedCardInPile(lastCardinPileDOM, allPilesDOM, pairsMOD, pairsDOM, pairsArray ) {

    for( let b= 0; pairsArray.length > b; b++ )  {
        if ( pairsArray[b].lastCardinPileDOM != null ) {
            pairsArray[b].lastCardinPileDOM.addEventListener('mousedown', dragStart(pairsArray[b].lastCardinPileDOM, pairsArray[b].pileMOD));
            pairsArray[b].lastCardinPileDOM.addEventListener('mouseup', dragEnd(pairsArray[b].lastCardinPileDOM));
            pairsArray[b].lastCardinPileDOM.addEventListener('click', () => {console.log('pasar a SHOW')})
        }
 }

    document.querySelector('.pile-main').addEventListener('click', () => {
        showPileDOM.firstElementChild.addEventListener('mousedown', dragStart(showPileDOM.firstElementChild, showPile));
        showPileDOM.firstElementChild.addEventListener('mouseup', dragEnd(showPileDOM.firstElementChild));
    })
    console.log(allPilesDOM)
    allPilesDOM.forEach(pile => {
        console.log('pile child has', pile.hasChildNodes())
        pile.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            if (pile.hasChildNodes()) { 
                pile.appendChild(document.getElementById('dragging'));
            } else {
                pile.createElement(document.getElementById('dragging'));
            } /* Error append chile node ???? */
        })
    });
    // render();
}

let selectedPile = -1;


function dragStart(selectedCard, pileMOD) {
    /* Once the user clicks the card and moves it pops up from the origin pile */
    let movedCard;
    selectedCard.addEventListener('dragstart', () => {
        setTimeout(()=> {  
            selectedCard.classList.add("invisible");
            selectedCard.id = "dragging";
            movedCard = pileMOD.popCard();
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
            card.classList.remove("invisible"); 
            card.removeAttribute('id');
        },1)
    })
}



//  printInConsoleforTESTING();
 function printInConsoleforTESTING() {
 }
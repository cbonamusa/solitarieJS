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
}

 function render() {
     for (let i = 0; i < piles.length; i++) {
         renderPile(piles[i], i, querySel(`[data-pile="${i+1}"] ul`))
     }
}
render();




/*-------------------------- GLOBAL MOD & DOM PILES&CARDS --------------------------*/
let allPilesMOD = [showPile, spadePile, heartPile, diamondPile, clubsPile]
for (let i = 0; i < piles.length; i++) { allPilesMOD.push(piles[i])};

let lastCardInPileMOD = [];
let pairsMOD = [];
for (let pileMOD of allPilesMOD ) { 
    if (pileMOD.cards.length > 0) { lastCardInPileMOD.push(pileMOD.cards[pileMOD.cards.length -1]) }
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
});





/*---------------------------- CLICK CARDS / DRAG CARDS  ----------------------------*/ 
clickedCardInPile( pairsArray );

function clickedCardInPile( pairsArray ) {

    for( let b= 0; pairsArray.length > b; b++ )  {
        if ( pairsArray[b].lastCardinPileDOM != null ) {
            pairsArray[b].lastCardinPileDOM.addEventListener('mousedown', dragStart(pairsArray[b].lastCardinPileDOM, pairsArray[b].lastCardInPileMOD, pairsArray[b].pileMOD));
            pairsArray[b].lastCardinPileDOM.addEventListener('mouseup', dragEnd(pairsArray[b].lastCardinPileDOM));        
        }  
    }

    document.querySelector('.pile-main').addEventListener('click', () => {
        showPileDOM.firstElementChild.addEventListener('mousedown', dragStart(showPileDOM.firstElementChild, showPile.cards[0] , showPile));
        showPileDOM.firstElementChild.addEventListener('mouseup', dragEnd(showPileDOM.firstElementChild));
    });
}




/*----------------------- LOGIC ACCEPTING CARDS AND MOVE-CARDS ------------------------*/ 
function dragStart(selectedCardDOM, selectedCardMOD, pileMOD) {
    selectedCardDOM.addEventListener('dragstart', () => {
        selectedCardDOM.id = "dragging";
        setTimeout(()=> {  
            selectedCardDOM.classList.add("invisible");
            pileMOD.popCard();
        }, 50);
        pairsArray.forEach(pair => {
            pair.pileDOM.addEventListener('mousemove', dragOver(pair.pileDOM, pair.pileMOD, selectedCardMOD));
        });
    });
}


function dragOver(pileDOM, pileMOD,  selectedCardMOD) {
    document.querySelectorAll('.pile');
    //? it doesent get into empty PILES even if they are in pileDOM var ?
    pileDOM.addEventListener('dragover', ev => {
        ev.preventDefault();
        // console.log('draggin over') 
        pileDOM.addEventListener('drop', dragDrop(pileDOM, pileMOD,  selectedCardMOD));
    });
}


function dragDrop(pileDOM, pileMOD,  selectedCardMOD) {
        if (pileMOD.canPushCard(selectedCardMOD)) {
            if (pileMOD.pileType == 'descendence' ) { 
                pileDOM.appendChild(document.getElementById('dragging'));           
            } else {
                pileDOM.prepend(document.getElementById('dragging'));
            }
            pileMOD.canPushCard(selectedCardMOD);
            reCountingPiles();
        }
}


function dragEnd(card) {
    card.addEventListener('dragend', () => {
        card.classList.remove("invisible"); 
        card.removeAttribute('id');
    })
}

function cleanPiles(pairsArray) {
    pairsArray.forEach(pile => {
        pile.pileDOM.innerHTML = "";
    })
}


/*----------------------- RECOUNTING CARDS IN PILES EACH MOVE ------------------------*/ 
function reCountingPiles() {
    /* Update piles once has moved, and click event to show card  */
    // cleanPiles(pairsArray); //not working PROPERLY
    // render();
};
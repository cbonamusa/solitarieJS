import Deck from './deck.js';
import { Pile } from './deck.js';

let querySel = (el) => document.querySelector(el);




/*--------------------- CREATE FULL DECK OF CARDS & SHUFLE --------------------*/
const deck = new Deck();
deck.shuffle();




/*---------------------- GENERATE ALL PILES WITH CARDS ------------------------*/
let piles = new Array();
for ( let i = 1; i <= 7; i++ ) { piles.push(new Pile(deck.cards.splice(0,i), `pile-${i}`, "descendence")); }
//let mainPile = new Pile(deck.cards, 'main', 'dontAccept'); 
let mainPile = deck;
let showPile = new Pile(new Array(), 'show', 'acceptAll');

let spadePile = new Pile(new Array(), 'spade', '♠');
let heartPile = new Pile(new Array(), 'heart', '♥');
let diamondPile = new Pile(new Array(), 'diamond', '♦');
let clubsPile = new Pile(new Array(), 'clubs', '♣');




/*-------------------------- GLOBAL MOD & DOM PILES&CARDS --------------------------*/
let allPilesMOD = [showPile, spadePile, heartPile, diamondPile, clubsPile];
for (let i = 0; i < piles.length; i++) { allPilesMOD.push(piles[i])};

let lastCardInPileDOM = [];
let lastCardInPileMOD = [];
let pairsDOM = [];
let pairsMOD = [];
let pairsArray = [];

const mainPileDOM = document.querySelector('.main-pile');
const showPileDOM = document.querySelector('.show-pile ul');
const allPilesDOM = document.querySelectorAll('.pile-list');

let divMainPile = document.createElement('div');
divMainPile.innerText = mainPile.cards.length;
divMainPile.classList.add('pile', 'pile-main')
mainPileDOM.appendChild(divMainPile);




/*--------------- RENDER CARDS OF GAME PILES & CALL EVENT CLICK F ----------------*/
function renderPile(pile,  dataPileDOM) {
    dataPileDOM.innerHTML = '';
    for( let x = 0; x < pile.cards.length ; x++ ) {
        dataPileDOM.appendChild(pile.cards[x].generateDOMElement('show'));
    }



}

function render() {
    /* --- render main pile and show --- */
    document.querySelector('.pile-main').addEventListener('click', () => {
        if (mainPile.cards.length != 0) {
            showPile.unshiftCard(mainPile.cards.pop());
            divMainPile.innerText = mainPile.cards.length;
            renderPile(showPile, showPileDOM);
            //cardsEventsForGaming( pairsArray );
        } else {
            mainPile.pushAll(showPile.popAll());
            showPileDOM.innerHTML = '';
        }   
    }); 


    /* --- MODEL Data --- */
    // lastCardInPileMOD = [];
    pairsMOD = [];
    for (let pileMOD of allPilesMOD ) { 
        if (pileMOD.cards.length > 0) { lastCardInPileMOD.push(pileMOD.cards[pileMOD.cards.length -1]) }
        pairsMOD.push( {lastCardInPileMOD: pileMOD.cards[pileMOD.cards.length -1], pileMOD});
    }

    for (let i = 0; i < piles.length; i++) {
        renderPile(piles[i], querySel(`[data-pile="${i+1}"] ul`))
    }

    /* --- DOMAIN  --- */
    // lastCardInPileDOM = [];
    pairsDOM = [];
    for (let pileDOM of allPilesDOM ) {
        if (pileDOM.hasChildNodes()) { lastCardInPileDOM.push(pileDOM.lastElementChild); }
        pairsDOM.push({lastCardInPileDOM: pileDOM.lastElementChild, pileDOM}) 
    }
    
    pairsArray = pairsDOM.map(function(item, index) {
        return {
             //lastCardInPileDOM: item.lastCardInPileDOM, 
             pileDOM: item.pileDOM,
             //lastCardInPileMOD: pairsMOD[index].lastCardInPileMOD,
             pileMOD: pairsMOD[index].pileMOD
         }
     });    
     cardsEventsForGaming( pairsArray );
}
render();



/*---------------------------- CLICK CARDS / DRAG CARDS  ----------------------------*/ 
function cardsEventsForGaming( pairsArray ) {
    for( let b= 0; pairsArray.length > b; b++ )  {
        console.log(pairsArray[b].pileDOM.lastElementChild)
        if ( pairsArray[b].pileDOM.lastElementChild != null ) {
            pairsArray[b].pileDOM.lastElementChild.addEventListener('mousedown', dragStart(pairsArray[b].pileDOM.lastElementChild, pairsArray[b].pileMOD.cards[pairsArray[b].pileMOD.cards.length -1], pairsArray[b].pileMOD));
            pairsArray[b].pileDOM.lastElementChild.addEventListener('mouseup', dragEnd(pairsArray[b].pileDOM.lastElementChild));        
        }  
    }

    // document.querySelector('.pile-main').addEventListener('click', () => {
    //     showPileDOM.firstElementChild.addEventListener('mousedown', dragStart(showPileDOM.firstElementChild, showPile.cards[0] , showPile));
    //     showPileDOM.firstElementChild.addEventListener('mouseup', dragEnd(showPileDOM.firstElementChild));
    // });
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
    pileDOM.addEventListener('dragover', ev => {
        ev.preventDefault();
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
            render();
        }
}


function dragEnd(card) {
    card.addEventListener('dragend', () => {
        card.classList.remove("invisible"); 
        card.removeAttribute('id');
    })
}


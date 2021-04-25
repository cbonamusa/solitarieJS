import Deck from './deck.js';
import { Pile } from './deck.js';

let querySel = (el) => document.querySelector(el);




/*--------------------- CREATE FULL DECK OF CARDS & SHUFLE --------------------*/
const deck = new Deck();
deck.shuffle();




/*---------------------- GENERATE ALL PILES WITH CARDS ------------------------*/
let piles = new Array();
for ( let i = 1; i <= 7; i++ ) { piles.push(new Pile(deck.cards.splice(0,i), `pile-${i}`, "descendence")); }
let mainPile = deck;
let showPile = new Pile(new Array(), 'show', 'acceptAll-X');

let spadePile = new Pile(new Array(), 'spade', '♠');
let heartPile = new Pile(new Array(), 'heart', '♥');
let diamondPile = new Pile(new Array(), 'diamond', '♦');
let clubsPile = new Pile(new Array(), 'clubs', '♣');



/*-------------------------- GLOBAL MOD & DOM PILES&CARDS --------------------------*/
let allPilesMOD = [showPile, spadePile, heartPile, diamondPile, clubsPile];
for (let i = 0; i < piles.length; i++) { allPilesMOD.push(piles[i])};

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
            showPile.pushCard(mainPile.cards.pop());
            divMainPile.innerText = mainPile.cards.length;
            renderPile(showPile, showPileDOM);
        } else {
            mainPile.pushAll(showPile.popAll());
            showPileDOM.innerHTML = '';
        }
    }); 

    /* --- MODEL Data --- */
    pairsMOD = [];
    for (let pileMOD of allPilesMOD ) { pairsMOD.push( {pileMOD}); }
    
    for (let i = 0; i < piles.length; i++) {
        renderPile(piles[i], querySel(`[data-pile="${i+1}"] ul`))
    }

    /* --- DOMAIN  --- */
    pairsDOM = [];
    for (let pileDOM of allPilesDOM ) { pairsDOM.push({pileDOM}) }

    
    pairsArray = pairsDOM.map(function(item, index) {
        return {
             pileDOM: item.pileDOM,
             pileMOD: pairsMOD[index].pileMOD
         }
     });  

     cardsEventsForGaming( pairsArray );
}
render();



/*---------------------------- CLICK CARDS / DRAG CARDS  ----------------------------*/ 
function cardsEventsForGaming( pairsArray ) {
    for( let b= 0; pairsArray.length > b; b++ )  {
        if ( pairsArray[b].pileDOM.lastElementChild != null ) {
            pairsArray[b].pileDOM.lastElementChild.addEventListener('mousedown', dragStart(pairsArray[b].pileDOM.lastElementChild, pairsArray[b].pileMOD.cards[pairsArray[b].pileMOD.cards.length -1], pairsArray[b].pileMOD));
            pairsArray[b].pileDOM.lastElementChild.addEventListener('mouseup', dragEnd(pairsArray[b].pileDOM.lastElementChild));        
        }  
    }
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
            pair.pileDOM.addEventListener('mousemove', dragOver(pair.pileDOM, selectedCardMOD));
        });
    });
}


function dragOver(pileDOM,  selectedCardMOD) {
    pileDOM.addEventListener('dragover', ev => {
        ev.preventDefault();
    });
    dragEnter(selectedCardMOD)
}


function dragEnter( selectedCardMOD) {
    document.addEventListener("dragenter", function( event ) {
        let pileMODTYPE;
        setTimeout(function() {
            for (let pair of pairsArray) {
                if (pair.pileDOM == event.target || pair.pileDOM.contains(event.target) ) {               
                   pileMODTYPE = pair.pileMOD.pileType
                   pair.pileDOM.addEventListener('drop', dragDrop(pair.pileDOM, pair.pileMOD, selectedCardMOD, pileMODTYPE));
                }
            }
        },300)
    }, false);
}


function dragDrop(pileDOM, pileMOD,  selectedCardMOD, pileMODTYPE) {
    if (pileMOD.canPushCard(selectedCardMOD, pileMODTYPE)) {
        pileDOM.appendChild(document.getElementById('dragging'));           
        render();
    }
}


function dragEnd(card) {
    card.addEventListener('dragend', () => {
        card.classList.remove("invisible"); 
        card.removeAttribute('id');
    })
}


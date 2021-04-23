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
function renderPile(pile,  dataPileDOM ) {
    dataPileDOM.innerHTML = '';
    for( let x = 0; x < pile.cards.length ; x++ ) {
        dataPileDOM.appendChild(pile.cards[x].generateDOMElement('show'));
    }
    //dataPileDOM.appendChild(pile.cards[pile.cards.length-1].generateDOMElement('show'));
}

function render() {
    /* --- render main pile and show --- */
    document.querySelector('.pile-main').addEventListener('click', () => {
        if (mainPile.cards.length != 0) {
            showPile.unshiftCard(mainPile.cards.pop());
            // showPileDOM.prepend(showPile.cards[0].generateDOMElement('show'));
            divMainPile.innerText = mainPile.cards.length;
            renderPile(showPile, showPileDOM)
        } else {
            mainPile.pushAll(showPile.popAll());
            showPileDOM.innerHTML = '';
        }   
        console.log('mainPile',mainPile);
        console.log(showPile)
    }); 


    /* --- MODEL Data --- */
    lastCardInPileMOD = [];
    pairsMOD = [];
    for (let pileMOD of allPilesMOD ) { 
        if (pileMOD.cards.length > 0) { lastCardInPileMOD.push(pileMOD.cards[pileMOD.cards.length -1]) }
        pairsMOD.push( {lastCardInPileMOD: pileMOD.cards[pileMOD.cards.length -1], pileMOD});
    }

    for (let i = 0; i < piles.length; i++) {
        renderPile(piles[i], querySel(`[data-pile="${i+1}"] ul`))
    }

    /* --- DOMAIN  --- */
    lastCardInPileDOM = [];
    pairsDOM = [];
    for (let pileDOM of allPilesDOM ) {
        if (pileDOM.hasChildNodes()) { lastCardInPileDOM.push(pileDOM.lastElementChild); }
        pairsDOM.push({lastCardInPileDOM: pileDOM.lastElementChild, pileDOM}) 
    }
    
    pairsArray = pairsDOM.map(function(item, index) {
       return {
            lastCardInPileDOM: item.lastCardInPileDOM, 
            pileDOM: item.pileDOM,
            lastCardInPileMOD: pairsMOD[index].lastCardInPileMOD,
            pileMOD: pairsMOD[index].pileMOD
        }
    });
    

    cardsEventsForGaming( pairsArray );
}
render();



/*---------------------------- CLICK CARDS / DRAG CARDS  ----------------------------*/ 
function cardsEventsForGaming( pairsArray ) {
    for( let b= 0; pairsArray.length > b; b++ )  {
        if ( pairsArray[b].lastCardInPileDOM != null ) {
            pairsArray[b].lastCardInPileDOM.addEventListener('mousedown', dragStart(pairsArray[b].lastCardInPileDOM, pairsArray[b].lastCardInPileMOD, pairsArray[b].pileMOD));
            pairsArray[b].lastCardInPileDOM.addEventListener('mouseup', dragEnd(pairsArray[b].lastCardInPileDOM));        
        }  
    }

    // document.querySelector('.pile-main').addEventListener('click', () => {
    //     showPileDOM.firstElementChild.addEventListener('mousedown', dragStart(showPileDOM.firstElementChild, showPile.cards[0] , showPile));
    //     showPileDOM.firstElementChild.addEventListener('mouseup', dragEnd(showPileDOM.firstElementChild));
    // });
}




/*----------------------- LOGIC ACCEPTING CARDS AND MOVE-CARDS ------------------------*/ 
function dragStart(selectedCardDOM, selectedCardMOD, pileMOD) {
    console.log('dragstart', pairsArray);
    selectedCardDOM.addEventListener('dragstart', () => {
        selectedCardDOM.id = "dragging";
        setTimeout(()=> {  
            selectedCardDOM.classList.add("invisible");
            pileMOD.popCard();
        }, 50);
        console.log('dragstart', pairsArray);
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
        console.log('draggin over') 
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
            reCountingPiles();
        }
        console.log('dragDrop', pairsArray)

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
    cleanPiles(pairsArray); //not working PROPERLY
    render();
};
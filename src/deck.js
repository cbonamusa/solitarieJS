/* ---------------------------------- VARIABLES ----------------------------------*/
const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"10" ,"J" ,"Q" ,"K"];
const PILETYPE = {
    ACCEPTALL: "all",
    ASCENDENTS: "asc",
    DESCENDENTS: "des"
}




/* ---------------------------------- DECK ----------------------------------*/
export default class Deck {
    constructor(cards) {
       this.cards = cards || completeDeck();
    }
    /* Send to the end the card in the pile */
    push(card) {
        this.cards.push(card)
    }
    pushAll(getCards){
        this.cards = getCards;
    }
    /* Shuffle the cards in random order */
    shuffle() {
        for ( let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}




/* ---------------------------------- PILE ----------------------------------*/
class Pile {
    constructor(cards, idClass, pileType) {
        this.cards = cards,
        this.pileType = pileType;
    }
    get numberOfCards() { return this.cards.length }

    pushCard(card) {
        this.cards.push(card);
    }
    unshiftCard(card) {
        this.cards.unshift(card);
    }
    popCard() {
        let retCard = this.cards.pop();
        return retCard;
    }
    popAll(){
        let retCards = this.cards;
        this.cards = [];
        return retCards;
    }

    canPushCard(card) {
        let acceptedCard = false;
        switch(this.pileType) {
            case 'acceptAll':
                acceptedCard = true;
                break;

            case 'dontAccept':
                acceptedCard = false;
                break;

            case 'descendence':
                acceptedCard = card.color != this.cards[this.cards.length-1].color && card.amount === this.cards[this.cards.length-1].amount -1 || this.cards.length === 0 && card.amount === 13;
                break;

            default: //piles -> "♠", "♣", "♥", "♦"
                if (this.cards.length === 0) { 
                    console.log(card.amout)
                    acceptedCard = card.suit === this.pileType && card.amout === 1;
                } else {
                    acceptedCard = card.suit === this.pileType && card.amount === this.cards[this.cards.length-1].amount +1 ; 
                }
                break;
        }
        if (acceptedCard) {
            this.pushCard(card);
        }
        return acceptedCard;
    }
}




/* ---------------------------------- CARD ----------------------------------*/
class Card {
    constructor (suit, value, amount) {
        this.suit = suit;
        this.value = value;
        this.amount = amount;
        this.color = suit === '♣' || suit === '♠' ? 'black' : 'red';
    }
    generateDOMElement(show) {
        const cardEl = document.createElement('li');
        cardEl.innerText = this.suit;
        cardEl.classList.add("card", this.color);
        cardEl.dataset.value = `${this.value} ${this.suit}`;
        cardEl.dataset.suit =`${this.suit}`;
        cardEl.setAttribute('draggable', true);
        cardEl.value = `${this.amount}`;
        show ? cardEl.dataset.show = true : cardEl.dataset.show = false ;
        return cardEl
    }
}




/* --------------------------- CREATE FULL DECK WITH CARDS ----------------------------*/
function completeDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map((value, index) => {
            return new Card(suit, value, index+1)
        })
    })
}




/* -------------------------------------- EXPORT --------------------------------------*/
export { Pile }
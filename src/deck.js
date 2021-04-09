const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"10" ,"J" ,"Q" ,"K"];

/* Nueva class de cada pila de cartas con estado y funcion quitar carta y poner carta */

export class Pile { //UNDER CONSTRUCTION v.v
    constructor(cards) {
        this.stack = cards
    }

    addCard() {

    }
    removeCard() {

    }

    validateCard() {

    }
}

export default class Deck {
    constructor(cards = completeDeck()) {
       this.cards = cards
    }
    get numberOfCards() {
        return this.cards.length
    }
    /* Shows the first card of the deck pile */
    pop() {
        return this.cards.shift()
    }
    /* Send to the end the card in the pile */
    push(card) {
        this.cards.push(card)
    }
    /* Shuffle the cards in random order */
    shuffle() {
        for ( let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}

class Card {
    constructor (suit, value, amount ) {
        this.suit = suit,
        this.value = value,
        this.amount = amount + 1,
        this.color = suit === '♣' || suit === '♠' ? 'black' : 'red';
    }
    
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        cardDiv.value = `${this.amount}`;
        return cardDiv
    }
}

function completeDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map((value, amount) => {
            return new Card(suit, value, amount)
        })
    })
}